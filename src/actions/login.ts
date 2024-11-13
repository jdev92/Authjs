"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { getUserByEmail } from "@/data/user";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validation des champs de connexion
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides !" };
  }

  const { email, password } = validatedFields.data;

  // Vérifier si l'utilisateur existe
  const existingUser = await getUserByEmail(email);
  console.log(existingUser);

  if (!existingUser) {
    return { error: "Utilisateur non trouvé !" };
  }

  // Comparer le mot de passe
  //   const passwordMatch = await bcrypt.compare(password, existingUser.password);
  //   if (!passwordMatch) {
  //     return { error: "Mot de passe incorrect !" };
  //   }

  // Si la connexion est réussie
  return {
    success: "Connexion réussie !",
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    },
  };
};

export default login;
