"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { authClient } from "@/lib/better-auth/auth-client";
import { cn } from "@/lib/utils";
import {
  type FormLoginSchema,
  useFormLoginSchema,
} from "@/lib/zod/schemas/formLoginSchema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();
  const { translateMessage } = useMessageTranslation();
  const form = useForm<FormLoginSchema>({
    resolver: zodResolver(useFormLoginSchema()),
    defaultValues: {
      email: "ilgnersilva@outlook.com",
      password: "Ilgner1234",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormLoginSchema) => {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (ctx) => {
            if ("twoFactorRedirect" in ctx.data) {
              console.log("Redirecioando");
            }
          },
          onError: (ctx) => {
            toast.error(translateMessage(ctx.error.code));
          },
        },
      );
    });
  };

  return (
    <div
      className={cn("flex flex-col justify-center gap-6 h-full", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remember me</FormLabel>
                      <FormControl>
                        <Choicebox
                          onValueChange={(value) => console.log(value)}
                        >
                          <ChoiceboxItem key={1} value="false">
                            <ChoiceboxItemHeader>
                              <ChoiceboxItemTitle>
                                Email{" "}
                                <ChoiceboxItemSubtitle>
                                  Teste
                                </ChoiceboxItemSubtitle>
                              </ChoiceboxItemTitle>
                            </ChoiceboxItemHeader>
                            <ChoiceboxIndicator />
                          </ChoiceboxItem>
                          <ChoiceboxItem key={2} value="username">
                            Username
                            <ChoiceboxIndicator />
                          </ChoiceboxItem>
                        </Choicebox>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
              <Button
                variant="default"
                type="submit"
                loading={isPending}
                disabled={isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
