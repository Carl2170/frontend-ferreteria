'use client';

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    HiChartPie,
    HiShoppingBag,
    HiUser,
} from "react-icons/hi";
import { TbCategoryFilled } from "react-icons/tb";

// 🔥 Array de items
const menuItems = [
    { path: "/dashboard", title: "Dashboard", icon: HiChartPie },
    { path: "/clientes", title: "Clientes", icon: HiUser },
    { path: "/productos", title: "Productos", icon: HiShoppingBag },
    { path: "/categorias", title: "Categorias", icon: TbCategoryFilled },
];

export function SidebarComponent() {
    const currentPath = usePathname();

    return (
        <Sidebar className="h-screen" aria-label="App Sidebar">
            <SidebarItems>
                <SidebarItemGroup>
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <SidebarItem
                                key={item.path}
                                icon={item.icon}
                                as={Link}         // 🔹 Usa Link internamente
                                href={item.path}  // 🔹 href del Link
                                className={isActive ? "bg-[#0f0f0f] text-white hover:bg-[#0f0f0f]" : ""}
                            >
                                {item.title}
                            </SidebarItem>
                        );
                    })}
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}


