import { defaultPosts, dedupePosts, sortPosts } from './blog';

const BLOG_API_ENDPOINT = '/.netlify/functions/blog-posts';
export const BLOG_ADMIN_TOKEN_STORAGE_KEY = 'quantx-blog-admin-token';

const mergeWithDefaultPosts = (customPosts) => sortPosts(dedupePosts([...customPosts, ...defaultPosts]));

const getStoredAdminToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(BLOG_ADMIN_TOKEN_STORAGE_KEY) || '';
};

const createAuthorizedHeaders = (token, includeJson = false) => {
  const headers = new Headers();
  const resolvedToken = token ?? getStoredAdminToken();

  if (includeJson) {
    headers.set('Content-Type', 'application/json');
  }

  if (resolvedToken) {
    headers.set('x-blog-admin-token', resolvedToken);
  }

  return headers;
};

const parsePostsResponse = async (response) => {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(payload?.message || 'Blog request failed.');
    error.status = response.status;
    throw error;
  }

  return Array.isArray(payload?.posts) ? payload.posts : [];
};

export const persistBlogAdminToken = (token) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    window.localStorage.setItem(BLOG_ADMIN_TOKEN_STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(BLOG_ADMIN_TOKEN_STORAGE_KEY);
};

export const fetchSharedBlogPosts = async () => {
  try {
    const response = await fetch(BLOG_API_ENDPOINT, {
      headers: createAuthorizedHeaders('', false),
    });
    const posts = await parsePostsResponse(response);
    return mergeWithDefaultPosts(posts);
  } catch {
    return sortPosts(defaultPosts);
  }
};

export const fetchCustomBlogPosts = async () => {
  const response = await fetch(BLOG_API_ENDPOINT, {
    headers: createAuthorizedHeaders('', false),
  });
  const posts = await parsePostsResponse(response);
  return sortPosts(dedupePosts(posts));
};

export const saveSharedBlogPost = async (post, token) => {
  const response = await fetch(BLOG_API_ENDPOINT, {
    method: 'POST',
    headers: createAuthorizedHeaders(token, true),
    body: JSON.stringify(post),
  });

  const posts = await parsePostsResponse(response);
  return sortPosts(dedupePosts(posts));
};

export const deleteSharedBlogPost = async (id, token) => {
  const response = await fetch(BLOG_API_ENDPOINT, {
    method: 'DELETE',
    headers: createAuthorizedHeaders(token, true),
    body: JSON.stringify({ id }),
  });

  const posts = await parsePostsResponse(response);
  return sortPosts(dedupePosts(posts));
};

export const clearSharedBlogPosts = async (token) => {
  const response = await fetch(BLOG_API_ENDPOINT, {
    method: 'DELETE',
    headers: createAuthorizedHeaders(token, true),
    body: JSON.stringify({ clearAll: true }),
  });

  const posts = await parsePostsResponse(response);
  return sortPosts(dedupePosts(posts));
};
