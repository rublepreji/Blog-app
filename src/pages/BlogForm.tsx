import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  addBlog,
  getBlogById,
  updateBlog
} from "../services/blogService";

import {
  useAuth
} from "../context/AuthContext";

function BlogForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        setFetching(true);
        const blog = await getBlogById(id);

        if (!blog) {
          setError("Blog not found.");
          return;
        }
        setTitle(blog.title);
        setContent(blog.content);

      } catch (error) {
        console.error(error);
        setError("Unable to load blog.");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();

  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode && id) {
        await updateBlog(
          id,
          title.trim(),
          content.trim()
        );
      } else {
        await addBlog(
          title.trim(),
          content.trim(),
          user.uid,
          user.email ?? ""
        );
      }
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      setError("Unable to save blog.");
    } finally {
      setLoading(false);
    }

  };

  if (fetching) {

    return <p>Loading blog...</p>;

  }

  return (

    <div>
      <h1>
        {isEditMode ? "Edit Blog" : "Add Blog"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />

        </div>
        <div>

          <label htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog..."
            rows={10}
            required
          />

        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Blog"
              : "Publish Blog"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/blogs")}
        >
          Cancel
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );

}

export default BlogForm;