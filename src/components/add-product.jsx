import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useCreateProductMutation,
  useGetProductCategoryQuery,
} from "@/store/slices/product-api-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { capitalize } from "../lib/utils";
import { Combobox } from "./ui/combobox";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.string().refine(
    (value) => {
      const number = parseFloat(value);
      return !isNaN(number) && number >= 0;
    },
    {
      message: "Price must be a non-negative number.",
    },
  ),
  description: z.string().nullable(),
  image: z.string().min(5, {
    message: "Image url is required.",
  }),
  category: z.string(),
});

const AddProduct = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createProduct] = useCreateProductMutation();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        const submissionData = {
          ...data,
          price: parseFloat(data.price),
        };
        const result = await createProduct(submissionData).unwrap();

        toast(`${result.title} was created.`, {
          description: `Item was added to cart`,
        });
        setIsOpen(false);
        form.reset();
      } catch (error) {
        toast({
          title: "Failed to create item.",
          description: `Cause: ${error}`,
          variant: "destructive",
        });
      }
    },
    [createProduct, form],
  );

  const {
    data: categoriesRaw,
    error,
    isLoading,
  } = useGetProductCategoryQuery();

  const options = useMemo(
    () =>
      categoriesRaw?.map((category) => ({
        label: capitalize(category),
        value: category,
      })),
    [categoriesRaw],
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span>{children}</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new item</SheetTitle>
          <SheetDescription>
            Fill all the fields to add a new product.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[85vh] w-full p-1">
          <div className="mx-auto max-w-[93%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="number"
                          className="hide-number-stepper"
                          placeholder="10.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          autoComplete="off"
                          placeholder="Description of your product."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image url</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Image url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        {!isLoading && !error && (
                          <Combobox options={options} {...field} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add item
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default memo(AddProduct);
