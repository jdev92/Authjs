"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiLogin, CiLogout } from "react-icons/ci";

const HeaderActions = () => {
  return (
    <div className="flex space-x-4 items-center">
      <Link href={"/auth/register"}>
        <Button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Créer un compte
        </Button>
      </Link>

      <Link href={"/auth/login"}>
        <Button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Connexion
          <CiLogin />
        </Button>
      </Link>

      <Link href={"/auth/logout"}>
        <Button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Déconnexion
          <CiLogout />
        </Button>
      </Link>
    </div>
  );
};

export default HeaderActions;
