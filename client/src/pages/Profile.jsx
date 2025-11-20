import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.auth);

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
        fullname: user?.fullname || "",
        email: user?.email || "",
        bio: user?.bio || "",
        password: "",
      },
    });

    const onSubmit = (values) => {
      // dispatch(updateProfile(values))
      //   .unwrap()
      //   .then((res) => {
      //     toast.success("Profile updated successfully");
      //   })
      //   .catch((err) => toast.error(err || "Update failed"));
      console.log(values)
    };
  return (
    <div className="pt-28 px-6">
      {" "}
      {/* Padding for fixed TopBar */}
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <div className="flex justify-center items-center mt-10">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar} />
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
}

export default Profile
