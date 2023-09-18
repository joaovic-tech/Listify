/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { api } from "@listify/axios-config";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UserInterface, userSchemas } from "../types/user.types";
import { useRouter } from "next/navigation";

export function AuthRegisterForm() {
  const router = useRouter();
  const [status, setStatus] = React.useState({
    type: "", // 'success' ou 'error'
    message: "",
    subMessage: "",
  });

  const form = useForm<UserInterface>({
    resolver: zodResolver(userSchemas),
    defaultValues: {
      username: "",
    },
  });

  function getFriendlyErrorMessage(errorMessage: string) {
    if (errorMessage.includes("User already exist!")) {
      return "Usuário já existe!";
    } else {
      return "Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.";
    }
  }

  async function onSubmit(values: UserInterface) {
    try {
      await api.post("/api/auth/register", values);
      // Cadastro bem-sucedido
      setStatus({
        type: "success",
        message: "Usuário cadastrado com sucesso!",
        subMessage: "Você será redimensionado para a página de login!",
      });

      // Redirecione o usuário para a rota /auth/login após um breve atraso (por exemplo, 2 segundos)
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      const friendlyMessage = getFriendlyErrorMessage(errorMessage);

      setStatus({
        type: "error",
        message: friendlyMessage,
        subMessage: "verifique os campo e-mail ou senha!",
      });
    }
  }

  return (
    <>
      {status.type === "success" && (
        <div
          className="px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg"
          role="alert"
        >
          <p className="font-bold">{status.message}</p>
          <p>{status.subMessage}</p>
        </div>
      )}
      {status.type === "error" && (
        <div
          className="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          <p className="font-bold">{status.message}</p>
          <p>{status.subMessage}</p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete=""
                    placeholder="listify"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Este é o seu nome de exibição público.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete=""
                    placeholder="Digite seu nome completo..."
                    {...field}
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
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete=""
                    placeholder="example@domain.com"
                    {...field}
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    autoComplete=""
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete=""
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
