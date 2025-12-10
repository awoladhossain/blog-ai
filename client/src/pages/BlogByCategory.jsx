import BlogCard from "@/components/BlogCard";
import { getBlogByCategory } from "@/redux/api/blogAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogByCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { categoryBlogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (category) {
      dispatch(getBlogByCategory(category));
    }
  }, [category, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-20 grid grid-cols-3 gap-4 mx-10">
      {categoryBlogs && categoryBlogs.length > 0 ? (
        categoryBlogs.map((blog) => <BlogCard props={blog} key={blog._id} />)
      ) : (
        <>
          <span>No blogs Available</span>
        </>
      )}
    </div>
  );
};

export default BlogByCategory;
