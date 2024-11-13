import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Merci de saisir un nom.",
  }),
  email: z.string().email({
    message: "Merci de saisir un email",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Merci de saisir un email valide." })
    .min(1, { message: "L'email est requis." }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." })
    .min(1, { message: "Le mot de passe est requis." }),
});
