import PhotoGrid from "../components/PhotoGrid";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import Loader from "../components/Loader";
import useInfinitePhotos from "../hooks/useInfinitePhotos";

export default function PhotoListPage() {
  const { photos, loadMore, loading, error, end } = useInfinitePhotos();

  return (
    <>
      <h1 className="text-center mt-4">Picsum Photo Gallery</h1>

      {error && (
        <div className="alert alert-danger mx-auto mt-3" style={{ maxWidth: "600px" }}>
          <strong>Error:</strong> {error}
          <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      <PhotoGrid photos={photos} />

      {!end && <InfiniteScrollTrigger onLoadMore={loadMore} />}
      {loading && <Loader />}

      {end && photos.length > 0 && (
        <p className="text-center text-muted py-3">
          No more photos to load.
        </p>
      )}

      {photos.length === 0 && !loading && (
        <p className="text-center text-muted py-3">
          No photos found.
        </p>
      )}
    </>
  );
}
