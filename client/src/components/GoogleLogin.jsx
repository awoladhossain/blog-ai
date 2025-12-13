import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "@/helpers/firebase";
import { RouteIndex } from "@/helpers/RouteName";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { googleLogin } from "@/redux/api/authAPI";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const googleResponse = await signInWithPopup(auth, provider);

    const user = googleResponse.user;
    const bodyData = {
      fullname: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };
 
    dispatch(googleLogin(bodyData))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "User Login Successfull with Google");
        navigate(RouteIndex);
      })
      .catch((err) => {
        toast.error(err || "Login failed");
      });
  };
  return (
    <>
      <Button variant="outline" className="w-full" onClick={handleLogin}>
        <FcGoogle /> Continue with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
