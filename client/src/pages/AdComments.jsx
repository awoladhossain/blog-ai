import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpinnerCustom } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteComment, getAllComments } from "@/redux/api/commentAPI";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdComments = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);


  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  if (loading) {
    return <SpinnerCustom />;
  }

  const handleDeleteBlog = (id) => {
    dispatch(deleteComment(id))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Blog deleted successfully");
      })
      .catch((err) => {
        // Extract the message from the error object
        const errorMessage = err?.message || err || "Delete failed";
        toast.error(errorMessage);
      });
  };
  return (
    <div className="pt-20 px-10">
      <Card className="shadow-sm border border-border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Comments</h2>
        </CardHeader>

        <CardContent>
          {comments?.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Blog</TableHead>
                  <TableHead className="font-semibold">Comment By</TableHead>
                  <TableHead className="font-semibold">Comment</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {comments?.map((blog) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Author */}
                    <TableCell className="font-medium">
                      {blog?.blogId?.title || "Unknown"}
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      {blog?.author?.fullname || "No category"}
                    </TableCell>

                    {/* <TableCell>{blog?.createdAt}</TableCell> */}
                    {/* Title */}
                    <TableCell>{blog?.content}</TableCell>

                    {/* Date */}
                    <TableCell>
                      {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() => handleDeleteBlog(blog._id)}
                        variant="destructive"
                        size="sm"
                        className="hover:bg-red-600 ursor-pointer"
                      >
                        <Trash className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdComments;
