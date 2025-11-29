import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { getAllBlogs } from "@/redux/api/blogAPI";
import { SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);


  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  if (loading) {
    return <SpinnerCustom />;
  }

  return (
    <div className="pt-20 px-10">
      <Card className="shadow-sm border border-border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button asChild className="bg-primary hover:bg-primary/80">
            <Link to={RouteBlogAdd}>Add Blog</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {blogs?.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Author</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="font-semibold">Slug</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {blogs?.map((blog) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Author */}
                    <TableCell className="font-medium">
                      {blog?.author?.fullname || "Unknown"}
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      {blog?.category?.name || "No category"}
                    </TableCell>

                    {/* Title */}
                    <TableCell>{blog?.title}</TableCell>

                    {/* Slug */}
                    <TableCell className="text-muted-foreground">
                      {blog?.slug}
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right space-x-2">
                      <Link to={RouteBlogEdit(blog._id)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary/10 cursor-pointer"
                        >
                          <SquarePen className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>

                      <Button
                        onClick={() => console.log("Delete blog:", blog._id)}
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

export default BlogDetails;
