import BlogEditor from "@/components/BlogEditor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpinnerCustom } from "@/components/ui/spinner";
import { RouteBlog } from "@/helpers/RouteName";
import { singleBlog, updateBlog } from "@/redux/api/blogAPI"; // UPDATED IMPORT
import { getAllCategories } from "@/redux/api/categoryAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

const EditBlog = () => {
  const dispatch = useDispatch();
  const { blog_id } = useParams();

  const { category: categories, loading: categoryLoading } = useSelector(
    (state) => state.category
  );
  const { singleBlog: singleBlogData, loading } = useSelector(
    (state) => state.blog
  );

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileUpload = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(preview);
  };

  // Fetch blog and categories on mount
  useEffect(() => {
    dispatch(singleBlog(blog_id));
    dispatch(getAllCategories());
  }, [dispatch, blog_id]);

  const formSchema = z.object({
    category: z.string().min(1, "Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      description: "",
    },
  });

  // Populate form when blog data is loaded
  useEffect(() => {
    if (singleBlogData) {
      form.reset({
        category: singleBlogData.category._id || singleBlogData.category,
        title: singleBlogData.title,
        slug: singleBlogData.slug,
        description: singleBlogData.description,
      });

      // Set the existing image preview
      if (singleBlogData.featuredImage) {
        setAvatarPreview(singleBlogData.featuredImage);
      }
    }
  }, [singleBlogData, form]);

  // Auto-generate slug from title
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && value.title) {
        const slug = slugify(value.title, { lower: true });
        form.setValue("slug", slug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleChangeData = (event, editor) => {
    const data = editor.getData();
    form.setValue("description", data);
  };

  const onSubmit = (values) => {
    // Only require image if there's no existing image
    if (!avatarFile && !singleBlogData?.featuredImage) {
      toast.error("Please upload a featured image");
      return;
    }

    const formData = new FormData();

    // Only add file if a new one was selected
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Add JSON data as a single field
    formData.append(
      "data",
      JSON.stringify({
        category: values.category,
        title: values.title,
        slug: values.slug,
        description: values.description,
        author: user._id,
      })
    );

    // Use updateBlog instead of createBlog
    dispatch(updateBlog({ id: blog_id, formData }))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Blog updated successfully");
        navigate(RouteBlog);
      })
      .catch((err) => {
        const errorMessage =
          typeof err === "string"
            ? err
            : err?.message || "Failed to update blog";
        toast.error(errorMessage);
      });
  };

  // Show loading spinner while fetching blog data
  if (loading && !singleBlogData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerCustom />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background p-4 my-20">
      <Card className="w-full max-w-4xl p-8 rounded-2xl shadow-lg border border-border/40 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Edit Blog</h1>
          <p className="text-muted-foreground text-sm">
            Please fill out the form below to edit a blog
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          ))}
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
                name="title"
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
                        placeholder="auto-generated slug"
                        {...field}
                        readOnly
                        className="bg-muted border border-border text-muted-foreground cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feature Image */}
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">
                  Feature Image{" "}
                  {singleBlogData?.featuredImage && "(Change to upload new)"}
                </span>
                <Dropzone onDrop={handleFileUpload}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="cursor-pointer relative w-36 h-36 border-2 border-dashed border-gray-300 rounded-xl flex justify-center items-center overflow-hidden"
                    >
                      <input {...getInputProps()} />
                      {avatarPreview ? (
                        <Avatar className="w-36 h-36">
                          <AvatarImage
                            src={avatarPreview}
                            className="object-cover"
                          />
                          <AvatarFallback>IMG</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Camera className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <div className="w-full max-w-[850px]">
                        <div className="border border-border rounded-lg overflow-hidden">
                          <BlogEditor
                            props={{
                              initialData: field.value || "",
                              onChange: handleChangeData,
                            }}
                          />
                        </div>
                      </div>
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
              {loading ? <SpinnerCustom /> : "Update Blog"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditBlog;
