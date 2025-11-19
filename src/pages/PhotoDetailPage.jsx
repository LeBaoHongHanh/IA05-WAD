import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPhotoDetail } from "../api/photos";
import Loader from "../components/Loader";

export default function PhotoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPhotoDetail(id);
        setPhoto(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading photo:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
        <button className="btn btn-secondary" onClick={() => navigate("/photos")}>
          Back to Gallery
        </button>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container my-4">
        <div className="alert alert-warning">Photo not found.</div>
        <button className="btn btn-secondary" onClick={() => navigate("/photos")}>
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/photos")}>
        ← Back to Gallery
      </button>

      <div className="text-center">
        <h2>{photo.title || "No Title"}</h2>

        <img
          src={photo.download_url}
          alt={photo.title || "Photo"}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "600px", objectFit: "contain", margin: "0 auto", display: "block" }}
        />
      </div>

      <div className="mt-4">
        <p>
          <strong>Author:</strong> {photo.author}
        </p>
        <p>
          <strong>Description:</strong> {photo.description || "No description available."}
        </p>
        <p>
          <strong>Dimensions:</strong> {photo.width} × {photo.height}
        </p>

        <a
          className="btn btn-primary"
          href={photo.download_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open full-size image
        </a>
      </div>
    </div>
  );
}
