import { useEffect, useState } from 'react';
import { loadBlogPosts } from '../data/blog';
import { fetchSharedBlogPosts } from '../data/blogApi';
import './BlogPage.css';

const formatBlogDate = (dateValue) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));

const BlogPage = ({ onNavigateHome }) => {
  const [posts, setPosts] = useState(loadBlogPosts);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    let isActive = true;

    const syncPosts = async () => {
      const nextPosts = await fetchSharedBlogPosts();

      if (isActive) {
        setPosts(nextPosts);
      }
    };

    syncPosts();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!activePost) {
      document.body.style.overflow = '';
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePost(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePost]);

  const [featuredPost] = posts;

  return (
    <>
      <main className="blog-page">
        <section className="blog-hero section-dark">
          <div className="container">
            <div className="blog-hero-grid">
              <div>
                <div className="tag tag-dark">Quant X Insights</div>
                <h1 className="sh-title dark blog-hero-title">
                  Practical thinking on <em>finance, systems, and growth.</em>
                </h1>
                <p className="sh-body dark blog-hero-body">
                  Commentary built for operators, founders, and leadership teams who need sharper financial visibility and stronger decision-making infrastructure.
                </p>
                <div className="blog-hero-actions">
                  <button type="button" className="btn-primary-dark" onClick={() => onNavigateHome('#contact')}>
                    Book a Strategy Call
                  </button>
                  <button type="button" className="btn-outline-dark" onClick={() => onNavigateHome()}>
                    Return Home
                  </button>
                </div>
              </div>

              {featuredPost ? (
                <button type="button" className="blog-feature-card blog-card-button" onClick={() => setActivePost(featuredPost)}>
                  <div className="blog-card-meta-row">
                    <span className="blog-chip">{featuredPost.category}</span>
                    <span className="blog-meta-text">{featuredPost.readTime}</span>
                  </div>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.excerpt}</p>
                  <div className="blog-feature-footer">
                    <div>
                      <div className="blog-meta-label">By {featuredPost.author}</div>
                      <div className="blog-meta-text">{formatBlogDate(featuredPost.publishedAt)}</div>
                    </div>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section section-white">
          <div className="container">
            <div className="section-header">
              <div className="tag tag-light">Latest Articles</div>
              <h2 className="sh-title" style={{ marginTop: '16px' }}>
                Insight designed to be <em>useful in practice.</em>
              </h2>
            </div>

            <div className="blog-post-grid">
              {posts.map((post) => (
                <button type="button" key={post.id} className="blog-post-card blog-card-button" onClick={() => setActivePost(post)}>
                  <div className="blog-card-meta-row">
                    <span className="blog-chip">{post.category}</span>
                    <span className="blog-meta-text">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span>{post.author}</span>
                    <span>{formatBlogDate(post.publishedAt)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activePost ? (
        <div className="blog-modal-backdrop" onClick={() => setActivePost(null)} role="presentation">
          <div
            className="blog-modal-panel blog-longform-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="blog-modal-close" onClick={() => setActivePost(null)} aria-label="Close article">
              Close
            </button>
            <div className="blog-card-meta-row">
              <span className="blog-chip">{activePost.category}</span>
              <span className="blog-meta-text">{activePost.readTime}</span>
            </div>
            <h3 id="blog-modal-title">{activePost.title}</h3>
            <p className="blog-modal-excerpt">{activePost.excerpt}</p>
            <div className="blog-card-footer blog-modal-footer">
              <span>{activePost.author}</span>
              <span>{formatBlogDate(activePost.publishedAt)}</span>
            </div>
            <div className="blog-longform-content">
              {activePost.content.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BlogPage;
