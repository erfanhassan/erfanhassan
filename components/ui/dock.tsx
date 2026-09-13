"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

import Link from "next/link"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    href?: string
    onClick?: (e: React.MouseEvent) => void
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
}

const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const DockIconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, DockIconButtonProps>(
  ({ icon: Icon, label, href, onClick, className }, ref) => {
    const content = (
      <>
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
        <span className={cn(
          "absolute -bottom-10 left-1/2 -translate-x-1/2",
          "px-3 py-1.5 rounded-md text-xs font-mono tracking-widest",
          "bg-[#0a0a0a] border border-[#222] text-green-400 shadow-[0_4px_12px_rgba(0,0,0,0.8)]",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity whitespace-nowrap pointer-events-none"
        )}>
          {label}
        </span>
      </>
    )

    const sharedClass = cn(
      "relative group p-3 rounded-lg flex items-center justify-center",
      "hover:bg-[#222] transition-colors",
      "pointer-events-auto",
      className
    )

    if (href) {
      return (
        <motion.div
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            onClick={onClick}
            aria-label={label}
            className={sharedClass}
          >
            {content}
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        aria-label={label}
        className={sharedClass}
      >
        {content}
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("w-full h-24 flex items-center justify-center p-2", className)}>
        <div className="w-full max-w-4xl h-24 rounded-2xl flex items-center justify-center relative pointer-events-none">
          <motion.div
            initial="initial"
            animate="animate"
            variants={floatingAnimation}
            className={cn(
              "flex items-center gap-1 p-2 rounded-2xl pointer-events-auto",
              "backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
              "bg-black/40 border-[#222]",
              "hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)] transition-shadow duration-300"
            )}
          >
            {items.map((item) => (
              <DockIconButton key={item.label} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }
