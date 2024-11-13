import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 text-gray-100">
      <div className="text-center max-w-xl p-8">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Bienvenue sur Future Kicks
        </h1>
        <p className="text-lg mb-10 leading-relaxed">
          Plongez dans l’univers de chaussures de sport où innovation et style
          se rencontrent. Découvrez des modèles uniques pour des performances de
          pointe.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 font-semibold px-8 py-3 text-lg rounded-md">
          <Link href="/products">Visitez la boutique</Link>
        </Button>
      </div>
    </main>
  );
}
