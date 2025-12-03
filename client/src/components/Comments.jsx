import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquareMore } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";

const Comments = () => {
  const formSchema = z.object({
    comments: z.string().min(2, {
      message: "comments must be at least 2 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-semibold mb-5">
        <MessageSquareMore className="w-8 h-8" /> Comments
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="write a comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Comments;
