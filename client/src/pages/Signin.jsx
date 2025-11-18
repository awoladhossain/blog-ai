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
import { RouteSignup } from "@/helpers/RouteName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  // this is the formschema
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  });
  // now initialzing the form schema or define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // define a submit handler
  function onSubmit(values) {
    console.log(values);
  }
  return (
    // <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
    //   <Card className="w-[450px] p-8 rounded-lg shadow-md">
    //     <h2 className="text-2xl font-bold mb-4">Sign In</h2>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //         <div className="space-y-4">
    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel className="text-sm font-medium text-gray-700">
    //                   Email
    //                 </FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     placeholder="email@example.com"
    //                     {...field}
    //                     className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel className="text-sm font-medium text-gray-700">
    //                   Password
    //                 </FormLabel>
    //                 <div className="relative">
    //                   <FormControl>
    //                     <Input
    //                       type={showPassword ? "text" : "password"}
    //                       placeholder="••••••••"
    //                       {...field}
    //                       className="bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
    //                     />
    //                   </FormControl>
    //                   <Button
    //                     type="button"
    //                     variant="ghost"
    //                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
    //                     onClick={() => setShowPassword(!showPassword)}
    //                   >
    //                     {showPassword ? (
    //                       <EyeOff className="h-5 w-5" />
    //                     ) : (
    //                       <Eye className="h-5 w-5" />
    //                     )}
    //                   </Button>
    //                 </div>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>
    //         <Button
    //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
    //           type="submit"
    //         >
    //           Sign In
    //         </Button>
    //       </form>
    //     </Form>
    //     <p className="text-sm text-muted-foreground text-center mt-4">
    //       Don’t have an account?{" "}
    //       <Link
    //         to={RouteSignup}
    //         className="text-primary hover:underline font-medium transition-colors"
    //       >
    //         Sign Up
    //       </Link>
    //     </p>
    //   </Card>
    // </div>
    <div className="flex justify-center items-center h-screen w-screen bg-background">
      <Card className="w-[450px] p-8 rounded-lg shadow-md bg-card text-card-foreground">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
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
                        className="bg-input border-border focus:ring-2 focus:ring-primary"
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
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium py-2 rounded-lg"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to={RouteSignup}
            className="text-primary hover:underline font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signin;
