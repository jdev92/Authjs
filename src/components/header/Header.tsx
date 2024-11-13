import Link from "next/link";
import HeaderActions from "./HeaderActions";

export const Header = async () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-blue-800 text-white p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="flex justify-between items-center">
        <Link
          className="text-xl font-bold hover:text-gray-300 transition-colors"
          href={"/"}
        >
          FutureKicks
        </Link>

        <div className="flex space-x-4">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};
