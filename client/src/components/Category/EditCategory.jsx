import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCategoryById, updateCategory } from "@/redux/api/categoryAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import z from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SpinnerCustom } from "../ui/spinner";
import { toast } from "sonner";

const EditCategory = () => {
  const dispatch = useDispatch();
  const { category_id } = useParams();

  // ---------------------------
  // Schema
  // ---------------------------
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
  });

  // ---------------------------
  // Form initialization
  // ---------------------------
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // ---------------------------
  // Redux state
  // ---------------------------
  const { singleCategory, loading, error } = useSelector(
    (state) => state.category
  );

  // ---------------------------
  // Fetch category by id
  // ---------------------------
  useEffect(() => {
    dispatch(getCategoryById(category_id));
  }, [dispatch, category_id]);

  // ---------------------------
  // Reset form when API data arrives
  // ---------------------------
  useEffect(() => {
    if (singleCategory) {
      form.reset({
        name: singleCategory.name,
        slug: singleCategory.slug,
      });
    }
  }, [singleCategory, form]);

  // ---------------------------
  // Auto-generate slug (correct way)
  // ---------------------------
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        form.setValue("slug", slugify(value.name || "", { lower: true }));
      }
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [form]);

  // ---------------------------
  // Submit
  // ---------------------------
  const onSubmit = (values) => {
    dispatch(updateCategory({ id: category_id, data: values })).unwrap().then((res)=>{
      toast.success(res.message || "Category updated successfully");
    }).catch((err)=>{
      toast.error(err || "Update failed");
    });
    form.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background">
      <Card className="w-full max-w-xl p-8 rounded-2xl shadow-lg border border-border/40 backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Edit Category</h1>
          <p className="text-muted-foreground text-sm">
            Update and modify your category details below
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
              {loading ? <SpinnerCustom /> : "Save Changes"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditCategory;
