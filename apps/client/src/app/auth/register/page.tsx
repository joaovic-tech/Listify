import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AuthRegisterForm } from "./components/auth-register-form";
import { ListTodo } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre-se",
  description: "Formulário de cadastro do Listify",
  authors: [
    {
      name: "João Victor <contato@joaovic.tech>",
      url: "https://joaovic-tech.com/",
    },
  ],
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex justify-start text-center gap-2 items-center text-lg font-medium">
            <ListTodo className="w-8 h-8 text-blue-600" />
            <h2 className="font-bold">Listify</h2>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Esta ferramenta me ajudou a organizar minhas tarefas e a
                ser mais produtivo do que nunca.&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                Lucas Silva
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="h-full p-4 flex flex-col justify-between">
          <div className="w-full justify-end flex items-center gap-4">
            <Link
              href="/examples/authentication"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Login
            </Link>
            <ModeToggle />
          </div>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha todos os campos para criar sua conta
              </p>
            </div>

            <AuthRegisterForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em cadastrar, você concorda com os nossos{" "}
              <Link
                href="/termos"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e com a nossa{" "}
              <Link
                href="/privacidade"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <Separator className="opacity-0" />
        </div>
      </div>
    </>
  );
}
