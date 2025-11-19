import { Link } from "react-router-dom";
import { useState } from "react";

export default function PhotoCard({ photo }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card shadow-sm h-100">
      <Link to={`/photos/${photo.id}`} className="text-decoration-none">
        {!imageError ? (
          <img
            src={`https://picsum.photos/id/${photo.id}/300/200`}
            className="card-img-top"
            alt={`Photo by ${photo.author}`}
            onError={() => setImageError(true)}
            style={{ height: "200px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="card-img-top bg-light d-flex align-items-center justify-content-center"
            style={{ height: "200px" }}
          >
            <span className="text-muted">Image unavailable</span>
          </div>
        )}
      </Link>

      <div className="card-body">
        <h6 className="card-title mb-0">Author: {photo.author}</h6>
        <small className="text-muted">ID: {photo.id}</small>
      </div>
    </div>
  );
}
