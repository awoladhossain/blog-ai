import { RouteSignin } from "@/helpers/RouteName";
import { logoutUser } from "@/redux/api/authAPI";
import { BookOpenText, LogIn, LogOut, MessageSquarePlus, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SearchBox from "./SearchBox";
import Theme from "./Theme/Theme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Logout successful");
        navigate(RouteSignin);
      })
      .catch((err) => {
        toast.error(err || "Logout failed");
      });
  };
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-background px-5 border-b border-border">
      <div className="text-foreground">
        <BookOpenText className="w-10 h-10 mx-2" />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>

      <div className="flex gap-3 ">
        <Theme />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.fullname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">
                  <User className="w-5 h-5" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">
                  <MessageSquarePlus className="w-5 h-5" />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
                >
                  <LogOut className="mr-2" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to={RouteSignin}>
              <LogIn className="mr-2" />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
