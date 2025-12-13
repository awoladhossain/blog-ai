import BlogCard from "@/components/BlogCard";
import { getBlogBySearch } from "@/redux/api/blogAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// SearchResult.jsx - Extract the parameter correctly
const SearchResult = () => {
  const dispatch = useDispatch();

  const { blogs, loading } = useSelector((state) => state.blog);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      dispatch(getBlogBySearch(q));
    }
  }, [q, dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-20 grid grid-cols-3 gap-4 mx-10">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard props={blog} key={blog._id} />)
      ) : (
        <>
          <span>No blogs Available</span>
        </>
      )}
    </div>
  );
};

export default SearchResult;
