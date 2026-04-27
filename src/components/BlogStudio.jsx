import { useState } from 'react';
import { BLOG_STORAGE_KEY, defaultPosts, saveCustomBlogPosts } from '../data/blog';
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
  const [customPosts, setCustomPosts] = useState(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const storedValue = window.localStorage.getItem(BLOG_STORAGE_KEY);
      const parsedValue = storedValue ? JSON.parse(storedValue) : [];
      return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
      return [];
    }
  });

  const combinedPosts = [...customPosts, ...defaultPosts].reduce((posts, post) => {
    if (posts.some((existingPost) => existingPost.id === post.id)) {
      return posts;
    }

    return [...posts, post];
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEntry((currentEntry) => ({
      ...currentEntry,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
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

    const nextPosts = [nextPost, ...customPosts.filter((post) => post.id !== nextPost.id)];
    saveCustomBlogPosts(nextPosts);
    setCustomPosts(nextPosts);
    setEntry(initialEntry);
    setMessage('Blog entry saved. It is now visible on `/blog` for this browser.');
  };

  const handleDelete = (postId) => {
    const nextPosts = customPosts.filter((post) => post.id !== postId);
    saveCustomBlogPosts(nextPosts);
    setCustomPosts(nextPosts);
    setMessage('Custom blog entry removed.');
  };

  const handleReset = () => {
    saveCustomBlogPosts([]);
    setCustomPosts([]);
    setMessage('Custom entries cleared. Default posts remain available.');
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
            This page is intentionally not linked anywhere else on the site. Entries saved here are stored in this browser&apos;s local storage and appear immediately on the public blog page.
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
                <button type="button" className="studio-secondary-btn" onClick={handleReset}>
                  Clear Custom Posts
                </button>
              </div>

              <form className="studio-form" onSubmit={handleSubmit}>
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
                  <button type="submit" className="nav-cta">Save Entry</button>
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
                          <button type="button" className="studio-delete-btn" onClick={() => handleDelete(post.id)}>
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
