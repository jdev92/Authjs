import { AdapterUser } from "next-auth/adapters";

export type TUser = AdapterUser & {
  role?: "admin" | "user";
};

export default TUser;
