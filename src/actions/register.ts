"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { getUserByEmail } from "@/data/user";

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champs invalides !" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email déjà utilisé !" };
  }

  const hashedPassword = await bcrypt.hash(password, 16);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: "Utilisateur créé avec succès !" };
  } catch (error) {
    return { error: "Erreur lors de la création de l'utilisateur." };
  }
};

export default register;
