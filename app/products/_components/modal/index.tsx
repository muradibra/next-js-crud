"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Edit2Icon } from "lucide-react";
import { TProduct } from "@/types";

type Props = {
  type?: "create" | "update";
  editedProduct?: TProduct;
};

const formSchema = z.object({
  title: z.string().min(3, "Min 3 characters"),
  description: z.string().min(3, "Min 3 characters"),
  price: z.preprocess(
    (a) => parseFloat(z.any().parse(a)),
    z.number().gte(0.01, "Min 0.01 and above")
  ),
});

export const ProductModal = ({ type = "create", editedProduct }: Props) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const triggerLabel =
    type === "create" ? "Add Product" : <Edit2Icon className="w-4 h-4" />;
  const title = type === "create" ? "Add Product" : "Edit Product";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editedProduct?.title ?? "",
      description: editedProduct?.description ?? "",
      price: editedProduct?.price ?? 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(form.formState.errors);
    setIsLoading(true);

    if (type === "create") {
      await handleCreate(values);
    } else {
      console.log("update");
      handleUpdate(values);
    }
    setIsLoading(false);
  }

  async function handleCreate(values: z.infer<typeof formSchema>) {
    const resp = await fetch(`${apiUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (resp.status === 201) {
      setIsOpen(false);
      toast.success("Product created successfully.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
  }

  async function handleUpdate(values: z.infer<typeof formSchema>) {
    if (!editedProduct) return;
    const resp = await fetch(`${apiUrl}/products/${editedProduct?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (resp.status === 200) {
      setIsOpen(false);
      toast.success("Product updated successfully.");
    } else {
      toast.error("An error occurred. Please try again.");
    }
    // console.log(await resp.json());
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-[10px] py-1" variant={"outline"}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[420px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="type..." {...field} />
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
                    <Textarea placeholder="type..." {...field} />
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
                    <Input type="number" placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
