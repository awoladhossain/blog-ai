import { RouteAddCategory } from "@/helpers/RouteName";
import { getAllCategories } from "@/redux/api/categoryAPI";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
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
  console.log(categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div className="pt-20 px-10">
      <Card>
        <CardHeader>
          <div>
            <Button asChild>
              <Link to={RouteAddCategory}>Add Content</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Category</TableHead>
                <TableHead className="text-center">Slug</TableHead>
                <TableHead className="text-right">Action</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => {
                return (
                  <TableRow key={category?._id}>
                    <TableCell className="font-medium">
                      {category?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {category?.slug}
                    </TableCell>
                    <TableCell className="text-right">Credit Card</TableCell>
                    {/* <TableCell className="text-right">$250.00</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
