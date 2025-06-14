import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormSchemaType } from "@/lib/validation";
import { useDispatch } from "react-redux";
import { addUsers, updateUsers } from "@/store/userSlice";
import type { User } from "@/types/User";

type DialogProps = {
  open: boolean;
  handleClickOpen: () => void;
  isEdit: boolean;
  data: User | null;
};

export function DialogDemo({
  open,
  handleClickOpen,
  isEdit,
  data: defaultData,
}: DialogProps) {
  const dispatch = useDispatch();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? defaultData?.name : "",
      email: isEdit ? defaultData?.email : "",
      username: isEdit ? defaultData?.username : "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    if (isEdit) {
      dispatch(updateUsers({ ...data, id: defaultData?.id ?? 0 }));
    } else {
      dispatch(
        addUsers({
          ...data,
          id: Math.random(),
        })
      );
    }

    handleClickOpen();
  };

  return (
    <Dialog open={open} onOpenChange={handleClickOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        forceMount
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
