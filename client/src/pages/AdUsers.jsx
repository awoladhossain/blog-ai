import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { deleteUser, getAllUsers } from "@/redux/api/userAPI";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdUsers = () => {
  const dispatch = useDispatch();

  const { allUsers, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (loading) {
    return <SpinnerCustom />;
  }

  const handleDeleteBlog = (id) => {
    dispatch(deleteUser(id))
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
          <h2 className="text-xl font-semibold">Users Information</h2>
        </CardHeader>

        <CardContent>
          {allUsers?.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Avatar</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allUsers?.map((blog) => (
                  <TableRow
                    key={blog._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Author */}
                    <TableCell className="font-medium">
                      {blog?.role || "Unknown"}
                    </TableCell>

                    {/* Category */}
                    <TableCell>{blog?.fullname || "No category"}</TableCell>
                    {/* Category */}
                    <TableCell>{blog?.email || "No category"}</TableCell>

                    {/* Title */}
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={blog?.avatar || "https://github.com/shadcn.png"}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </TableCell>

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

export default AdUsers;
