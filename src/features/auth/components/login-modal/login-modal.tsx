import { useModal } from "@/+shared/hooks/use-modal";
import { queryClient } from "@/+shared/setup/react-query/setup";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { AuthApi } from "@/services/auth/auth-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpModal } from "../sign-up-modal/sign-up-modal";
import { toast } from "sonner";

export const LoginModal = () => {
  const { closeModal, openModal } = useModal();
  const loginMutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field is required" })
      .email({ message: "Please provide a valid email" }),
    password: z.string().min(1, { message: "This field is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Log in</DialogTitle>
        <DialogDescription>
          Don't have an account?{" "}
          <a
            onClick={() => {
              closeModal();
              openModal(<SignUpModal />);
            }}
            className="underline underline-offset-4 cursor-pointer"
          >
            Sign up
          </a>
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="eg. john.doe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={loginMutation.isPending}
          className="mb-2 md:mb-0"
        >
          Log in
        </Button>
      </DialogFooter>
    </>
  );
};
