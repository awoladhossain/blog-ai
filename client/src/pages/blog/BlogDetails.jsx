import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RouteBlogAdd } from '@/helpers/RouteName';
import { SquarePen, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  return (
    <div className="pt-20 px-10">
      <Card className="shadow-sm border border-border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Button asChild className="bg-primary hover:bg-primary/80">
            <Link to={RouteBlogAdd}>Add Blog</Link>
          </Button>
        </CardHeader>

        {/* <CardContent>
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
        </CardContent> */}
      </Card>
    </div>
  );
}

export default BlogDetails
