"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Dock } from "@/components/ui/dock";
import { Home, User, Folder, Mail, BookOpen } from "lucide-react";

export default function FloatingDock() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string, anchorId?: string) => {
    if (pathname === "/" && anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (path === "/" && !anchorId) {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }
    router.push(path);
  };

  const dockItems = [
    {
      icon: Home,
      label: "Home",
      onClick: () => navigateTo("/"),
    },
    {
      icon: Folder,
      label: "Projects",
      onClick: () => navigateTo("/#work", "work"),
    },
    {
      icon: BookOpen,
      label: "Blog",
      onClick: () => navigateTo("/blog"),
    },
    {
      icon: User,
      label: "About",
      onClick: () => navigateTo("/#about", "about"),
    },
    {
      icon: Mail,
      label: "Contact",
      onClick: () => navigateTo("/#contact", "contact"),
    },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full pointer-events-none">
      <Dock items={dockItems} />
    </div>
  );
}
