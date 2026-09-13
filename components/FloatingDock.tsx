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
      href: "/",
      onClick: (e: React.MouseEvent) => {
        if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    },
    {
      icon: Folder,
      label: "Projects",
      href: "/#work",
      onClick: (e: React.MouseEvent) => {
        if (pathname === "/") {
          e.preventDefault();
          const el = document.getElementById("work");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: BookOpen,
      label: "Blog",
      href: "/blog",
    },
    {
      icon: User,
      label: "About",
      href: "/#about",
      onClick: (e: React.MouseEvent) => {
        if (pathname === "/") {
          e.preventDefault();
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: Mail,
      label: "Contact",
      href: "/#contact",
      onClick: (e: React.MouseEvent) => {
        if (pathname === "/") {
          e.preventDefault();
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full pointer-events-none">
      <Dock items={dockItems} />
    </div>
  );
}
