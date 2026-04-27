import { loadBlogPosts } from '../data/blog';
import './BlogPage.css';

const formatBlogDate = (dateValue) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));

const BlogPage = ({ onNavigateHome }) => {
  const posts = loadBlogPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
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
              <article className="blog-feature-card">
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
              </article>
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
              <article key={post.id} className="blog-post-card">
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
              </article>
            ))}
          </div>

          {otherPosts.length > 0 ? (
            <div className="blog-longform-list">
              {otherPosts.map((post) => (
                <article key={`${post.id}-detail`} className="blog-longform-card">
                  <div className="blog-card-meta-row">
                    <span className="blog-chip">{post.category}</span>
                    <span className="blog-meta-text">{formatBlogDate(post.publishedAt)}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <div className="blog-longform-content">
                    {post.content.split('\n\n').map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
