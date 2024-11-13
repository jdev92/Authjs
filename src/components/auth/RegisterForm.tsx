"use client";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components//FormError";
import FormSuccess from "@/components/FormSuccess";
import register from "@/actions/register";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        redirect("/auth/login");
      });
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Section gauche */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="text-center p-10">
          <h2 className="text-4xl font-bold mb-4">Bienvenue!</h2>
          <p className="text-lg">
            Inscrivez-vous pour profiter de nos services exclusifs.
          </p>
        </div>
      </div>

      {/* Section droite */}
      <div className="w-1/2 bg-gradient-to-br from-blue-900 to-purple-900 text-white flex items-center justify-center">
        <CardWrapper
          title="Inscrivez-vous"
          headerLabel="Créez un compte pour nous rejoindre."
          backButtonLabel="Déjà un compte ?"
          backButtonHref="/auth/login"
          showSocial
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Jean Dupont"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="email@example.com"
                          type="email"
                        />
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
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending} className="w-full">
                S'inscrire
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default RegisterForm;
