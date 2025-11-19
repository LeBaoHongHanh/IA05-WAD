import PhotoCard from "./PhotoCard";

export default function PhotoGrid({ photos }) {
  return (
    <div className="container mt-4">
      <div className="row g-3">
        {photos.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p.id}>
            <PhotoCard photo={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
