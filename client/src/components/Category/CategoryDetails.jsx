import { RouteAddCategory } from "@/helpers/RouteName";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const CategoryDetails = () => {
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
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
