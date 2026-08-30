"use client";

import { usePathname } from "next/navigation";
import PillNav from "./PillNav";
import RegularNav from "./RegularNav";

export default function ClientNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <PillNav />;
  }

  return <RegularNav />;
}
