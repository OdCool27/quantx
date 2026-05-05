import { useEffect, useRef, useState } from 'react';
import { defaultPosts, sortPosts } from '../data/blog';
import {
  BLOG_ADMIN_TOKEN_STORAGE_KEY,
  clearSharedBlogPosts,
  deleteSharedBlogPost,
  fetchCustomBlogPosts,
  persistBlogAdminToken,
  saveSharedBlogPost,
} from '../data/blogApi';
import './BlogStudio.css';

const initialEntry = {
  title: '',
  category: '',
  author: '',
  publishedAt: '',
  readTime: '',
  excerpt: '',
  content: '',
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const BlogStudio = () => {
  const [entry, setEntry] = useState(initialEntry);
  const [message, setMessage] = useState('');
  const [customPosts, setCustomPosts] = useState([]);
  const [adminToken, setAdminToken] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem(BLOG_ADMIN_TOKEN_STORAGE_KEY) || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const syncTimerRef = useRef(null);

  const combinedPosts = sortPosts(
    [...customPosts, ...defaultPosts].reduce((posts, post) => {
      if (posts.some((existingPost) => existingPost.id === post.id)) {
        return posts;
      }

      return [...posts, post];
    }, []),
  );

  useEffect(() => {
    let isActive = true;
    const loadTimer = window.setTimeout(async () => {
      try {
        const sharedPosts = await fetchCustomBlogPosts();

        if (isActive) {
          setCustomPosts(sharedPosts);
        }
      } catch {
        if (isActive) {
          setMessage('Unable to load shared blog posts right now. Default posts are still shown below.');
        }
      }
    }, 0);

    return () => {
      isActive = false;
      window.clearTimeout(loadTimer);

      if (syncTimerRef.current) {
        window.clearTimeout(syncTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEntry((currentEntry) => ({
      ...currentEntry,
      [name]: value,
    }));
  };

  const handleTokenChange = (event) => {
    const nextToken = event.target.value;
    setAdminToken(nextToken);
    persistBlogAdminToken(nextToken.trim());
  };

  const queueVisibilityMessage = () => {
    if (syncTimerRef.current) {
      window.clearTimeout(syncTimerRef.current);
    }

    syncTimerRef.current = window.setTimeout(() => {
      setMessage('Posts are shared across all visitors. Netlify edge caches can take up to about 60 seconds to reflect updates everywhere.');
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextPost = {
      ...entry,
      id: slugify(entry.title),
      author: entry.author || 'Quant X Editorial',
      readTime: entry.readTime || '5 min read',
      publishedAt: entry.publishedAt || new Date().toISOString().slice(0, 10),
    };

    if (!nextPost.id || !nextPost.category || !nextPost.excerpt || !nextPost.content) {
      setMessage('Complete the title, category, excerpt, and content fields before saving.');
      return;
    }

    setIsSubmitting(true);

    try {
      const nextPosts = await saveSharedBlogPost(nextPost, adminToken.trim());
      setCustomPosts(nextPosts);
      setEntry(initialEntry);
      setMessage('Blog entry saved. It is now available to all users on `/blog`.');
      queueVisibilityMessage();
    } catch (error) {
      setMessage(error.message || 'Unable to save this blog entry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId) => {
    setIsSubmitting(true);

    try {
      const nextPosts = await deleteSharedBlogPost(postId, adminToken.trim());
      setCustomPosts(nextPosts);
      setMessage('Shared blog entry removed.');
      queueVisibilityMessage();
    } catch (error) {
      setMessage(error.message || 'Unable to delete this blog entry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    setIsSubmitting(true);

    try {
      const nextPosts = await clearSharedBlogPosts(adminToken.trim());
      setCustomPosts(nextPosts);
      setMessage('Shared custom entries cleared. Default posts remain available.');
      queueVisibilityMessage();
    } catch (error) {
      setMessage(error.message || 'Unable to clear shared posts right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="blog-studio-page">
      <section className="blog-studio-hero section-dark">
        <div className="container">
          <div className="tag tag-dark">Owner Studio</div>
          <h1 className="sh-title dark" style={{ marginTop: '16px' }}>
            Private blog entry manager for <em>Quant X.</em>
          </h1>
          <p className="sh-body dark blog-studio-intro">
            This page is intentionally not linked anywhere else on the site. Entries saved here are stored in a shared Netlify-backed store so they can appear on the public blog page for all visitors.
          </p>
          <p className="sh-body dark blog-studio-intro">
            Reads are public. Writes can be protected with a `BLOG_ADMIN_TOKEN` environment variable, which you can enter below before publishing or deleting posts.
          </p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="studio-grid">
            <div className="studio-panel">
              <div className="studio-panel-header">
                <div>
                  <div className="tag tag-light">New Entry</div>
                  <h2 className="studio-title">Create or replace a post</h2>
                </div>
                <div className="studio-panel-actions">
                  <button type="button" className="studio-secondary-btn" onClick={handleReset} disabled={isSubmitting}>
                    Clear Custom Posts
                  </button>
                </div>
              </div>

              <form className="studio-form" onSubmit={handleSubmit}>
                <label>
                  <span>Admin Token</span>
                  <input
                    type="password"
                    name="adminToken"
                    value={adminToken}
                    onChange={handleTokenChange}
                    placeholder="Required only if BLOG_ADMIN_TOKEN is set in Netlify"
                    autoComplete="off"
                  />
                </label>

                <div className="studio-form-grid">
                  <label>
                    <span>Title</span>
                    <input type="text" name="title" value={entry.title} onChange={handleChange} placeholder="Board-ready reporting for SMEs" />
                  </label>
                  <label>
                    <span>Category</span>
                    <input type="text" name="category" value={entry.category} onChange={handleChange} placeholder="Reporting" />
                  </label>
                  <label>
                    <span>Author</span>
                    <input type="text" name="author" value={entry.author} onChange={handleChange} placeholder="Quant X Editorial" />
                  </label>
                  <label>
                    <span>Publish Date</span>
                    <input type="date" name="publishedAt" value={entry.publishedAt} onChange={handleChange} />
                  </label>
                  <label>
                    <span>Read Time</span>
                    <input type="text" name="readTime" value={entry.readTime} onChange={handleChange} placeholder="5 min read" />
                  </label>
                </div>

                <label>
                  <span>Excerpt</span>
                  <textarea name="excerpt" value={entry.excerpt} onChange={handleChange} rows="3" placeholder="Short summary that appears on the blog cards." />
                </label>

                <label>
                  <span>Content</span>
                  <textarea
                    name="content"
                    value={entry.content}
                    onChange={handleChange}
                    rows="10"
                    placeholder="Full post content. Separate paragraphs with a blank line."
                  />
                </label>

                <div className="studio-form-footer">
                  <button type="submit" className="nav-cta" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Entry'}
                  </button>
                  {message ? <div className="studio-message">{message}</div> : null}
                </div>
              </form>
            </div>

            <div className="studio-panel">
              <div className="studio-panel-header">
                <div>
                  <div className="tag tag-light">Preview</div>
                  <h2 className="studio-title">What is currently available</h2>
                </div>
              </div>

              <div className="studio-preview-list">
                {combinedPosts.map((post) => {
                  const isDefaultPost = defaultPosts.some((defaultPost) => defaultPost.id === post.id);

                  return (
                    <article key={post.id} className="studio-preview-card">
                      <div className="blog-card-meta-row">
                        <span className="blog-chip">{post.category}</span>
                        <span className="studio-preview-type">{isDefaultPost ? 'Default' : 'Custom'}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="studio-preview-footer">
                        <span>{post.publishedAt}</span>
                        {!isDefaultPost ? (
                          <button type="button" className="studio-delete-btn" onClick={() => handleDelete(post.id)} disabled={isSubmitting}>
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogStudio;
