import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addComment, getAllComments } from "@/redux/api/commentAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareMore } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";

const Comments = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { singleBlog } = useSelector((state) => state.blog);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  const formSchema = z.object({
    comments: z.string().min(2, {
      message: "comments must be at least 2 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });

  function onSubmit(values) {
    const data = {
      blogId: singleBlog?._id,
      author: user._id,
      content: values.comments,
    };

    dispatch(addComment(data))
      .unwrap()
      .then((res) => toast.success(res.message || "Comment added successfully"))
      .catch((err) => toast.error(err || "Comment failed"));

    form.reset();
  }

  // Filter comments by this blog
  const filteredComments = comments.filter((c) => c.blogId === singleBlog?._id);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-semibold mb-5">
        <MessageSquareMore className="w-8 h-8" /> Comments
      </h1>

      {/* Comment Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Write a comment..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* Comments List */}
      <div className="mt-10 space-y-5">
        {filteredComments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          filteredComments.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-md shadow-sm bg-white dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={item.author?.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{item.author?.fullname}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
