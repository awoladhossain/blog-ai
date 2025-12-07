import { getRelatedBlogs } from "@/redux/api/blogAPI";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RelatedBlog = ({ category, blogId }) => {
  const dispatch = useDispatch();
  const { relatedBlogs, loading } = useSelector((state) => state.blog);

  // useEffect(() => {
  //   if (category?.name) {
  //     dispatch(getRelatedBlogs(category.name)); // Pass just the string
  //   }
  // }, [category?.name, dispatch]);

  // Filter out the current blog from related blogs
  // const filteredRelatedBlogs =
  //   relatedBlogs?.filter((blog) => blog._id !== blogId) || [];

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  if (filteredRelatedBlogs.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No related blogs found
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {filteredRelatedBlogs.slice(0, 3).map((blog) => (
        <motion.div
          key={blog._id}
          whileHover={{ scale: 1.03 }}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md bg-gray-50 dark:bg-neutral-800 cursor-pointer"
        >
          <p className="font-semibold text-gray-900 dark:text-gray-200">
            {blog.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {blog.description?.replace(/<[^>]*>/g, "").substring(0, 100)}...
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedBlog;
