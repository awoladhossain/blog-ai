import Comments from "@/components/Comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SpinnerCustom } from "@/components/ui/spinner";
import { singleBlog } from "@/redux/api/blogAPI";
import { motion } from "framer-motion";
import { decode } from "html-entities";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SingleBlogDetails = () => {
  const blog_params = useParams();
  const dispatch = useDispatch();
  const {
    singleBlog: blog,
    loading,
    error,
  } = useSelector((state) => state.blog);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(singleBlog(blog_params.blog_id));
  }, []);

  if (loading) return <SpinnerCustom />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-24 mx-auto max-w-[1300px] px-5"
    >
      <div className="md:flex-nowrap flex-wrap flex gap-10">
        {/* LEFT CONTENT */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="border rounded-xl shadow-md md:w-[70%] w-full p-6 bg-white dark:bg-neutral-900"
        >
          {/* Blog Title */}
          <h1 className="text-4xl font-bold mb-4 leading-snug text-gray-900 dark:text-gray-100">
            {blog?.title}
          </h1>

          {/* Author Section */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={blog?.author?.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold text-lg">
                  {blog?.author?.fullname}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on {moment(blog?.createdAt).format("DD MMM, YYYY")}
                </p>
              </div>
            </div>

            {/* Placeholder Like/Comments */}
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              <p>❤️ 12</p>
              <p>💬 {comments.length}</p>
            </div>
          </div>

          {/* Blog Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="my-6 overflow-hidden rounded-xl"
          >
            <img
              src={blog?.featuredImage}
              className="rounded-xl w-full object-cover transition-all duration-300"
              alt=""
            />
          </motion.div>

          {/* Blog Body */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="prose dark:prose-invert max-w-full leading-relaxed text-[17px]"
            dangerouslySetInnerHTML={{
              __html: decode(blog?.description) || "No description",
            }}
          ></motion.div>

          {/* Comments */}
          <div className="border-t mt-10 pt-6">
            <h2 className="text-xl font-semibold mb-3">Comments</h2>
            <Comments />
          </div>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.15 }}
          className="border rounded-xl shadow-md md:w-[30%] w-full p-5 bg-white dark:bg-neutral-900 h-fit"
        >
          <h2 className="text-xl font-bold mb-4">Related Blogs</h2>

          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md bg-gray-50 dark:bg-neutral-800 cursor-pointer"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-200">
                  Related Blog {i}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Short preview text here...
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SingleBlogDetails;
