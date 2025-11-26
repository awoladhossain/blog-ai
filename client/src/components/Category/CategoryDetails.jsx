import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import { deleteCategory, getAllCategories } from "@/redux/api/categoryAPI";
import { SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { SpinnerCustom } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const { category: categories, loading } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  if (loading) {
    return <SpinnerCustom />;
  }
  const deleteCategoryFromDB = (id) => {
    console.log("deleted this: ", id);
    dispatch(deleteCategory(id))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Category deleted successfully");
      })
      .catch((err) => {
        toast.error(err || "Delete failed");
      });
  };
  return (
    <div className="pt-20 px-10">
      <Card className="shadow-sm border border-border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button asChild className="bg-primary hover:bg-primary/80">
            <Link to={RouteAddCategory}>Add Category</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {categories?.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px] font-semibold">
                    Category
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Slug
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    <TableCell className="text-center  text-muted-foreground">
                      {category.slug}
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Link to={RouteEditCategory(category._id)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary/10"
                        >
                          <SquarePen />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteCategoryFromDB(category._id)}
                        variant="destructive"
                        size="sm"
                        className="hover:bg-red-600"
                      >
                        <Trash />
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

export default CategoryDetails;
