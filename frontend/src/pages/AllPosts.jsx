import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPosts = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/admin/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const renderVideo = (videoUrl) => {
    // Check if the video is a YouTube URL
    const youtubeRegExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube|youtu|youtube-nocookie)\.(?:com|be)\/(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]+)/;
    const match = videoUrl.match(youtubeRegExp);
    
    if (match) {
      const videoId = match[1];
      return (
        <div className="mt-2">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return (
      <div className="mt-2">
        <video controls className="w-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">
                <Link to={`/posts/${article._id}`} className="hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600">{article.category}</p>
              <p className="mt-2">{article.body}</p>
              {article.video && renderVideo(article.video)}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(article.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default AllPosts;
