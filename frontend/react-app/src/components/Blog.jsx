
const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Reading: Digital vs Physical Books',
      description: 'Explore how digital books are transforming the way we read and how physical books still hold a special charm.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-4FrySEMFBMcMeRAjms1FllTdGhc2qxjYw&s',
      link: '/blog/future-of-reading',
    },
    {
      id: 2,
      title: 'Top 10 Must-Read Books for 2024',
      description: 'Discover the most anticipated and highly recommended books to add to your reading list this year.',
      image: 'https://i.ytimg.com/vi/fvLE3x4zmqU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDVPpDHyb7Q4v8ytcikTM8N15xZ-g',
      link: '/blog/top-books-2024',
    },
    {
      id: 3,
      title: 'How to Sell Your Used Books Online',
      description: 'Learn the best platforms and tips to turn your used books into extra cash.',
      image: 'https://don16obqbay2c.cloudfront.net/wp-content/uploads/Store_Screenshots_Book-1568632074.png',
      link: '/blog/sell-used-books',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Discover articles about books, reading trends, and tips for book lovers. Stay inspired and informed!
        </p>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <a
                  href={post.link}
                  className="text-blue-700 font-bold hover:text-blue-500"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;