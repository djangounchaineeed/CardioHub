import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    video: "",
    body: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3500/api/admin/articles/${postId}`);
        if (!response.ok) {
          throw new Error("Article not found");
        }
        const data = await response.json();
        setPost(data.article);
        setFormData({
          title: data.article.title,
          category: data.article.category,
          video: data.article.video,
          body: data.article.body,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3500/api/admin/articles/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update article");
      }
      setPost(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3500/api/admin/articles/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
      navigate("/posts");
    } catch (err) {
      setError(err.message);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {post ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {isEditing ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                  Save
                </button>
              </form>
            ) : (
              post.title
            )}
          </h1>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 mb-2 w-full"
              />
            ) : (
              post.category
            )}
          </p>
          <p className="mb-4">
            <strong>Published:</strong> {new Date(post.date).toLocaleDateString()}
          </p>

          {/* Display video or input for video URL */}
          {post.video && (
            <div className="mb-4">
              {isEditing ? (
                <input
                  type="text"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  className="border p-2 mb-2 w-full"
                />
              ) : getYouTubeEmbedUrl(post.video) ? (
                <iframe
                  width="100%"
                  height="400"
                  src={getYouTubeEmbedUrl(post.video)}
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg shadow"
                ></iframe>
              ) : (
                <video controls className="w-full rounded-lg shadow">
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          <p className="text-lg">
            {isEditing ? (
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="border p-2 mb-2 w-full h-40"
              />
            ) : (
              post.body
            )}
          </p>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white p-2 mr-2"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2"
          >
            Delete
          </button>
        </div>
      ) : (
        <p>No post found.</p>
      )}
    </div>
  );
};

export default PostPage;
