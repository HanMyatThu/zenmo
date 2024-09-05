"use client";

import { useState } from "react";
import * as z from "zod";
import { store } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/common/alert-modal";

interface SettingsFormProps {
  initialData: store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValue = z.infer<typeof formSchema>;

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<SettingFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  const handleSubmit = async (data: SettingFormValue) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeid}`, { ...data });
      router.refresh();
      toast.success("Store is updated.");
    } catch {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeid}`);
      router.refresh();
      router.push("/");
      toast.success(`Store is Deleted`);
    } catch {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Are you sure?"
        description="This action cannot be undone!"
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button onClick={() => setOpen(true)} variant="destructive" size="icon">
          <Trash className="size-4" />
        </Button>
      </div>
      <Separator className="h-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="ml-auto"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};