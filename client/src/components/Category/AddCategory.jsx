import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SpinnerCustom } from "../ui/spinner";
import slugify from "slugify";
const AddCategory = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // this is the formschema
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Fullname must be at least 3 characters long",
    }),
    slug: z.string().min(3, {
      message: "Slug must be at least 3 characters long",
    }),
  });

  // now initialzing the form schema or define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(()=>{
    const categoryName = form.watch("name");
    if(categoryName){
      const slug = slugify(categoryName,{lower: true});
      form.setValue("slug",slug);
    }
  },)
  // define a submit handler
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background">
      <Card className="w-full max-w-xl p-8 rounded-2xl shadow-lg border border-border/40 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Create Category
          </h1>
          <p className="text-muted-foreground text-sm">
            Add a new category to organize your blog posts.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Category Details
              </h2>

              {/* Category Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        className="bg-input border border-border focus:ring-2 focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        placeholder="auto-generated slug"
                        {...field}
                        className="bg-muted border border-border text-muted-foreground cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-full py-2 bg-primary hover:bg-primary/80 text-primary-foreground"
              type="submit"
              disabled={loading}
            >
              {loading ? <SpinnerCustom /> : "Submit"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddCategory;
