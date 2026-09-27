import {useNavigate} from "react-router-dom";
import {deleteBlog} from "../services/blogService";
import {useAuth} from "../context/AuthContext";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorEmail: string;
  onDelete: (id: string) => void;
}

function BlogCard({
  id,
  title,
  content,
  authorId,
  authorEmail,
  onDelete
}: BlogCardProps) {

  const navigate = useNavigate();
  const { user } = useAuth();
  const isOwner = user?.uid === authorId;
  const handleDelete = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await deleteBlog(id);
      onDelete(id);

    } catch (error) {
      console.error("Delete failed:", error);
      alert("Unable to delete the blog.");
    }
  };

  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
      <small>
        Author: {authorEmail}
      </small>
      {isOwner && (
        <div>
          <button onClick={() => navigate(`/blogs/edit/${id}`)}>
            Edit
          </button>
          <button onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default BlogCard;