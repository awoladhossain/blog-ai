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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpinnerCustom } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const AddBlog = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.category);

  // this is the formschema
  const formSchema = z.object({
    category: z.string().min(3, {
      message: "Fullname must be at least 3 characters long",
    }),
    title: z.string().min(3, {
      message: "Fullname must be at least 3 characters long",
    }),
    slug: z.string().min(3, {
      message: "Slug must be at least 3 characters long",
    }),
    description: z.string().min(3, {
      message: "Slug must be at least 3 characters long",
    }),
  });

  // now initialzing the form schema or define the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      description: "",
    },
  });

  useEffect(() => {
    const blogTitle = form.watch("title");
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  });
  // define a submit handler
  function onSubmit(values) {
    console.log(values);
    dispatch(createCategory(values))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Category created successfully");
      })
      .catch((err) => {
        toast.error(err || "Category creation failed");
      });
    form.reset();
  }
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background">
      <Card className="w-full max-w-xl p-8 rounded-2xl shadow-lg border border-border/40 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Create Blog</h1>
          <p className="text-muted-foreground text-sm">
            Create a new blog post
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Blog Details
              </h2>
              {/* Category */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>

                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title"
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
              {/* Description */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description"
                        {...field}
                        className="bg-input border border-border focus:ring-2 focus:ring-primary"
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

export default AddBlog;
