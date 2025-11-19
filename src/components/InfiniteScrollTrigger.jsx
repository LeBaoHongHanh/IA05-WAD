import { useEffect, useRef } from "react";

export default function InfiniteScrollTrigger({ onLoadMore }) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [onLoadMore]);

  return <div ref={ref} className="py-4" style={{ height: "30px" }} />;
}
