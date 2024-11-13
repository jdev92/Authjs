import { Schema, model, models, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface pour les propriétés d'un utilisateur
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  emailVerified: boolean;
}

// Interface pour les méthodes statiques du modèle User
interface IUserModel extends Model<IUser> {
  isAdmin(userId: string): Promise<boolean>;
}

// Définition du schéma de l'utilisateur
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hacher le mot de passe avant de sauvegarder en BDD
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Méthode d'instance pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Méthode statique pour vérifier si un utilisateur est admin
UserSchema.statics.isAdmin = async function (userId: string) {
  const user = await this.findById(userId);
  return user ? user.role === "admin" : false;
};

// Ajout d'un index secondaire pour les requêtes fréquentes par rôle
UserSchema.index({ role: 1 });

// Vérifier si le modèle est déjà chargé pour éviter l'erreur
const User =
  models && models.User
    ? (models.User as IUserModel)
    : model<IUser, IUserModel>("User", UserSchema);

export default User;
