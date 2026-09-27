import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {getBlogs} from "../services/blogService";
import BlogCard from "../components/BlogCard";
import {useAuth} from "../context/AuthContext";

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorEmail: string;
}

function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {

      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data as Blog[]);

      } catch (error) {
        console.error(error);
        setError("Unable to load blogs.");
      } finally {

        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = (id: string) => {
    setBlogs((previousBlogs) =>
      previousBlogs.filter((blog) => blog.id !== id)
    );

  };
  const handleLogout = async () => {

    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <p>Loading blogs...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <header>
        <h1>BlogHub</h1>
        <p>
          Logged in as: {user?.email}
        </p>
        <button onClick={handleLogout}>
          Logout
        </button>
      </header>
      <Link to="/blogs/new">
        <button>
          Add New Blog
        </button>
      </Link>
      <section>

        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog}
              onDelete={handleDelete}/>
          ))
        )}
      </section>
    </div>
  );
}

export default BlogList;