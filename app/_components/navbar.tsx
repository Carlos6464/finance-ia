"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathmane = usePathname();
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        {/* LOGO */}
        <Image src="/logo.svg" width={173} height={39} alt="Finance IA" />

        {/* MENU */}
        <Link
          href="/"
          className={
            pathmane === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathmane === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathmane === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinaturas
        </Link>
      </div>

      {/* DIREITA */}
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
