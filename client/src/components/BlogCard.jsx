import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const BlogCard = ({ props }) => {
  const descriptionPreview =
    props.description.length > 120
      ? props.description.slice(0, 120) + "..."
      : props.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden shadow-md rounded-2xl">
        {/* Blog Image */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={props.featuredImage}
            alt={props.title}
            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          />
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={props.author?.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">
                {props.author?.fullname}
              </span>
            </div>

            {props.author?.role === "admin" && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheck className="w-4 h-4" /> Admin
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="font-bold text-xl leading-snug">{props.title}</h1>

          {/* Description Preview */}
          <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
            {descriptionPreview}
          </p>

          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            Read More
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
