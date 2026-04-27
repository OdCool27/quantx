export const BLOG_STORAGE_KEY = 'quantx-blog-posts';

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
  {
    id: 'automation-controls',
    title: 'Automation without controls is just faster risk',
    category: 'Operations',
    author: 'Quant X Editorial',
    publishedAt: '2026-03-28',
    readTime: '4 min read',
    excerpt:
      'Automation should reduce friction while strengthening oversight. When controls are missing, the same systems that create speed can also multiply avoidable errors.',
    content:
      'Many teams adopt automation to eliminate repetitive work, but speed alone is not the outcome that matters. If approvals, reconciliations, and exception handling are not designed into the process, automation simply moves mistakes through the business more quickly.\n\nThat is why effective transformation joins process design with reporting discipline and clear accountability. Automated workflows should leave an audit trail, surface anomalies early, and make it easier for leadership to trust the numbers.\n\nThe strongest systems do not just save time. They create confidence.',
  },
  {
    id: 'board-ready-reporting',
    title: 'What makes reporting board-ready for investors and lenders',
    category: 'Reporting',
    author: 'Quant X Editorial',
    publishedAt: '2026-02-19',
    readTime: '6 min read',
    excerpt:
      'Decision-makers need more than spreadsheets. Board-ready reporting connects financial performance to trends, risks, and the choices leadership needs to make next.',
    content:
      'Investor-ready reporting is concise, credible, and decision-oriented. It should explain what changed, why it changed, and what leadership intends to do next. That means management accounts need context, not just totals.\n\nA useful reporting pack usually includes performance against plan, cash position, working capital movement, major risks, and a view of operational drivers behind the numbers. It also needs consistency. When every month is presented differently, leadership spends time decoding instead of acting.\n\nClear reporting improves confidence inside the business and outside it. That confidence is often what unlocks better funding conversations and stronger governance.',
  },
];

export const loadBlogPosts = () => {
  if (typeof window === 'undefined') {
    return defaultPosts;
  }

  try {
    const storedValue = window.localStorage.getItem(BLOG_STORAGE_KEY);

    if (!storedValue) {
      return defaultPosts;
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return defaultPosts;
    }

    return [...parsedValue, ...defaultPosts]
      .reduce((posts, post) => {
        if (posts.some((existingPost) => existingPost.id === post.id)) {
          return posts;
        }

        return [...posts, post];
      }, [])
      .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
  } catch {
    return defaultPosts;
  }
};

export const saveCustomBlogPosts = (posts) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
};
