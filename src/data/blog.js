export const defaultPosts = [
  {
    id: 'cash-flow-visibility',
    title: 'Why cash flow visibility matters more than profit on paper',
    category: 'Finance Strategy',
    author: 'Quant X Editorial',
    publishedAt: '2026-04-10',
    readTime: '5 min read',
    excerpt:
      'Profit can look healthy while a business quietly runs out of room to operate. Strong cash flow discipline keeps growth from turning fragile.',
    content:
      'Growing businesses often discover too late that profitability does not automatically create resilience. When receivables stretch, supplier terms tighten, or capital expenditure lands earlier than expected, the real pressure shows up in cash. A disciplined finance function creates visibility before those moments become emergencies.\n\nAt Quant X, we treat cash flow reporting as a management tool, not a compliance output. Weekly operating visibility, scenario planning, and better forecasting help founders make decisions with more control and less guesswork.\n\nThe businesses that scale well usually understand not just whether they are profitable, but when cash enters, when it leaves, and how quickly the underlying pattern is changing.',
  },
];

export const isValidPostShape = (post) =>
  post &&
  typeof post === 'object' &&
  typeof post.id === 'string' &&
  typeof post.title === 'string' &&
  typeof post.category === 'string' &&
  typeof post.excerpt === 'string' &&
  typeof post.content === 'string';

export const dedupePosts = (posts) =>
  posts.reduce((uniquePosts, post) => {
    if (!isValidPostShape(post) || uniquePosts.some((existingPost) => existingPost.id === post.id)) {
      return uniquePosts;
    }

    return [...uniquePosts, post];
  }, []);

export const sortPosts = (posts) =>
  [...posts].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

export const loadBlogPosts = () => {
  return sortPosts(defaultPosts);
};
