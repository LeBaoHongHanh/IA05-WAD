import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPhotos } from "../api/photos";

export default function useInfinitePhotos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [end, setEnd] = useState(false);
  const initRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loading || end) return;
    setLoading(true);
    setError(null);

    try {
      const newPhotos = await fetchPhotos(page, 20);

      if (newPhotos.length === 0) {
        setEnd(true);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading photos:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, end]);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    loadMore();
  }, [loadMore]);

  return { photos, loadMore, loading, error, end };
}
