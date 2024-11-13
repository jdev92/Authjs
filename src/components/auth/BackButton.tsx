"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  title: string;
}

const BackButton = ({ href, label, title }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>
        {label} {title}
      </Link>
    </Button>
  );
};

export default BackButton;
