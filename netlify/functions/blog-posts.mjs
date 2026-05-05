import { getStore } from '@netlify/blobs';

const BLOG_STORE_NAME = 'quantx-blog';
const BLOG_POSTS_KEY = 'posts';
const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const createJsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });

const normalizePost = (post) => {
  if (!post || typeof post !== 'object') {
    return null;
  }

  const normalizedPost = {
    id: typeof post.id === 'string' ? post.id.trim() : '',
    title: typeof post.title === 'string' ? post.title.trim() : '',
    category: typeof post.category === 'string' ? post.category.trim() : '',
    author: typeof post.author === 'string' && post.author.trim() ? post.author.trim() : 'Quant X Editorial',
    publishedAt: typeof post.publishedAt === 'string' && post.publishedAt.trim() ? post.publishedAt.trim() : new Date().toISOString().slice(0, 10),
    readTime: typeof post.readTime === 'string' && post.readTime.trim() ? post.readTime.trim() : '5 min read',
    excerpt: typeof post.excerpt === 'string' ? post.excerpt.trim() : '',
    content: typeof post.content === 'string' ? post.content.trim() : '',
  };

  if (!normalizedPost.id || !normalizedPost.title || !normalizedPost.category || !normalizedPost.excerpt || !normalizedPost.content) {
    return null;
  }

  return normalizedPost;
};

const dedupePosts = (posts) =>
  posts.reduce((uniquePosts, post) => {
    const normalizedPost = normalizePost(post);

    if (!normalizedPost || uniquePosts.some((existingPost) => existingPost.id === normalizedPost.id)) {
      return uniquePosts;
    }

    return [...uniquePosts, normalizedPost];
  }, []);

const sortPosts = (posts) =>
  [...posts].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

const loadStoredPosts = async () => {
  const store = getStore(BLOG_STORE_NAME);
  const storedPosts = await store.get(BLOG_POSTS_KEY, { type: 'json' });
  return Array.isArray(storedPosts) ? sortPosts(dedupePosts(storedPosts)) : [];
};

const saveStoredPosts = async (posts) => {
  const store = getStore(BLOG_STORE_NAME);
  const nextPosts = sortPosts(dedupePosts(posts));
  await store.setJSON(BLOG_POSTS_KEY, nextPosts);
  return nextPosts;
};

const isAuthorized = (request) => {
  const configuredToken = process.env.BLOG_ADMIN_TOKEN;

  if (!configuredToken) {
    return true;
  }

  return request.headers.get('x-blog-admin-token') === configuredToken;
};

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...JSON_HEADERS,
        Allow: 'GET, POST, DELETE, OPTIONS',
      },
    });
  }

  if (request.method === 'GET') {
    const posts = await loadStoredPosts();
    return createJsonResponse({ posts });
  }

  if (!isAuthorized(request)) {
    return createJsonResponse(
      {
        error: 'Unauthorized',
        message: 'This action requires a valid blog admin token.',
      },
      401,
    );
  }

  if (request.method === 'POST') {
    const payload = await request.json().catch(() => null);
    const normalizedPost = normalizePost(payload);

    if (!normalizedPost) {
      return createJsonResponse(
        {
          error: 'Invalid post',
          message: 'A blog post must include title, category, excerpt, content, and a valid id.',
        },
        400,
      );
    }

    const currentPosts = await loadStoredPosts();
    const nextPosts = [normalizedPost, ...currentPosts.filter((post) => post.id !== normalizedPost.id)];
    const savedPosts = await saveStoredPosts(nextPosts);

    return createJsonResponse({ posts: savedPosts });
  }

  if (request.method === 'DELETE') {
    const payload = await request.json().catch(() => ({}));
    const postId = typeof payload?.id === 'string' ? payload.id.trim() : '';
    const clearAll = payload?.clearAll === true;
    const currentPosts = await loadStoredPosts();

    const nextPosts = clearAll ? [] : currentPosts.filter((post) => post.id !== postId);

    if (!clearAll && !postId) {
      return createJsonResponse(
        {
          error: 'Invalid request',
          message: 'Provide a post id to delete or set clearAll to true.',
        },
        400,
      );
    }

    const savedPosts = await saveStoredPosts(nextPosts);
    return createJsonResponse({ posts: savedPosts });
  }

  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      ...JSON_HEADERS,
      Allow: 'GET, POST, DELETE, OPTIONS',
    },
  });
};
