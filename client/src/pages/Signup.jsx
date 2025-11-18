import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { RouteSignin } from "@/helpers/RouteName";
import { registerUser } from "@/redux/api/authAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // this is the formschema
  const formSchema = z
    .object({
      fullname: z.string().min(3, {
        message: "Fullname must be at least 3 characters long",
      }),
      email: z.string().email(),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  // now initialzing the form schema or define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // define a submit handler
  function onSubmit(values) {
    dispatch(registerUser(values))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Registration successful");
        form.reset();
        navigation(RouteSignin);
      })
      .catch((err) => {
        toast.error(err || "Registration failed");
      });
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-background">
      <Card className="w-[450px] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="bg-input border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        {...field}
                        className="bg-input border-border0 focus:ring-2 focus:ring-primary"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Confirm Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                          className="bg-input border-border focus:ring-2 focus:ring-ring-primary pr-10"
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
            </div>

            {loading ? (
              <SpinnerCustom />
            ) : (
              <Button
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium py-2 rounded-lg"
                type="submit"
              >
                Sign Up
              </Button>
            )}
          </form>
        </Form>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Already have an account?
          <Link
            to={RouteSignin}
            className="text-primary hover:underline font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
