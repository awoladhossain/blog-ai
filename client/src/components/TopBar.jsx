import { RouteSignin } from "@/helpers/RouteName";
import { BookOpenText, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import Theme from "./Theme/Theme";
import { Button } from "./ui/button";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div>
        <BookOpenText className="w-10 h-10 mx-2" />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>

      <div className="flex gap-3">
        <Theme />
        <Button asChild>
          <Link to={RouteSignin}>
            <LogIn />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
