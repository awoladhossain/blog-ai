import { RouteBlogDetails } from "@/helpers/RouteName";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
const RelatedBlog = ({
  featuredImage,
  title,
  description,
  blogId: _id,
  slug,
}) => {
  const imageUrl = featuredImage || "/placeholder-blog.jpg";
  const reparams = useParams();

  const cleanDesc = description
    ? description.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
    : "No description available.";
  return (
    <Link to={RouteBlogDetails(reparams.category, slug, _id)}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-neutral-800">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x250?text=No+Image";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title || "Untitled Blog"}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {cleanDesc}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default RelatedBlog;
