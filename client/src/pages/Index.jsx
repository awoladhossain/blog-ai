import BlogCard from "@/components/BlogCard";
import { SpinnerCustom } from "@/components/ui/spinner";
import { getAllBlogs } from "@/redux/api/blogAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog || {});
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  if (loading) {
    return <SpinnerCustom />;
  }

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

export default Index;
