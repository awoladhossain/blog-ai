import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getUserById } from "@/redux/api/userAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
const Profile = () => {
  const dispatch = useDispatch();
  // logged-in user(from authSlice)
  const { user: authUser } = useSelector((state) => state.auth);

  // Fetched full profile (from userSlice)
  const { user: profileUser, loading } = useSelector((state) => state.user);



  // Fetch full user profile
  useEffect(() => {
    if (authUser?._id) {
      dispatch(getUserById(authUser._id));
    }
  }, [authUser]);


  const [showPassword, setShowPassword] = useState(false);
  // Validation schema
  const formSchema = z.object({
    fullname: z.string().min(3, "Fullname must be at least 3 characters"),
    email: z.string().email(),
    bio: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
  });
  // Load user data into form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (profileUser) {
      form.reset({
        fullname: profileUser.fullname,
        email: profileUser.email,
        bio: profileUser.bio || "",
        password: "",
      });
    }
  }, [profileUser]);


  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SpinnerCustom />
      </div>
    );
  }

  const onSubmit = (values) => {
    // dispatch(updateProfile(values))
    //   .unwrap()
    //   .then((res) => {
    //     toast.success("Profile updated successfully");
    //   })
    //   .catch((err) => toast.error(err || "Update failed"));
    console.log(values);
  };
  return (
    <div className="pt-28 px-6">
      {" "}
      {/* Padding for fixed TopBar */}
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <div className="flex justify-center items-center mt-10">
            <Avatar className="w-20 h-20 relative cursor-pointer">
              <AvatarImage src={profileUser?.avatar} />
              <div className="absolute bottom-0 left-1/2 z-10 w-6 h-6 bg-white rounded-full flex justify-center items-center shadow-md">
                <Camera className="w-4 h-4 text-black" />
              </div>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Fullname */}
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-input border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write something about yourself..."
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-input border-border focus:ring-2 focus:ring-primary pr-10"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/80"
                  type="submit"
                >
                  Save Changes
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
