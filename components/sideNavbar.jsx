"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  PackagePlus,
  Users,
  PackageSearch,
  CornerDownLeft,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Nav from "./ui/nav";
import { Button } from "./ui/button";
import clsx from "clsx";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".sidebar") && !isCollapsed) {
      setIsCollapsed(true);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isCollapsed]);

  return (
    <div
      className={clsx(
        "sticky border-r-.5 pt-20 bg-white h-lvh transition-all duration-300 ease-in-out sidebar",
        isCollapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="absolute top-6 right-[-20px]">
        <Button
          variant="secondary"
          className="rounded-full cursor-pointer p-2 shadow-md hover:scale-105 transition"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={clsx("transition-transform", {
              "rotate-180": isCollapsed,
            })}
          />
        </Button>
      </div>

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            label: "128",
            icon: LayoutDashboard,
            variant: "default",
            href: "/",
          },
          {
            title: "Add Product",
            label: "",
            icon: PackagePlus,
            variant: "ghost",
            href: "/add-product",
          },
          {
            title: "Users",
            label: "",
            icon: Users,
            variant: "ghost",
            href: "/users",
          },
          {
            title: "Orders",
            label: "23",
            icon: PackageSearch,
            variant: "ghost",
            href: "/orders",
          },
          {
            title: "Logout",
            label: "",
            icon: CornerDownLeft,
            variant: "ghost",
            href: "/logout",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;