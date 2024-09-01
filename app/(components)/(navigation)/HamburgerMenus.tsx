import Link from "next/link";
import React from "react";
import { animate, motion } from "framer-motion";
import { useAppContext } from "../context";

const menus = [
  {
    href: "/",
    title: "Home",
    duration: 1,
  },
  {
    href: "/profile",
    title: "Who is?",
    duration: 1.5,
  },
  {
    href: "/blogs",
    title: "Blogs",
    duration: 2,
  },
];

function HamburgerMenus({ session }: { session: any }) {
  const menuStyle = "text-4xl text-gray-400 hover:text-black hover:font-bold";

  const { showHamburger, setShowHamburger } = useAppContext();

  return (
    <div
      className={`fixed top-0 z-30 w-full h-screen bg-white pt-20 transition-opacity duration-300 sm:block md:hidden lg:hidden xl:hidden ${
        showHamburger ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="flex flex-col items-center gap-8"
        onClick={() => setShowHamburger(false)}
      >
        {menus.map((menu, index) => (
          <motion.div
            key={index}
            variants={{
              initial: {
                opacity: 0,
                y: 100,
              },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: menu.duration,
                },
              },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
          >
            <Link className={menuStyle} href={menu.href}>
              {menu.title}
            </Link>
          </motion.div>
        ))}

        {session?.user?.role === "admin" && (
          <Link className={menuStyle} href="/write/new">
            Write
          </Link>
        )}
        {/* <AuthLinks /> */}
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/" className={menuStyle}>
            Logout
          </Link>
        ) : (
          <Link href="/api/auth/signin " className={menuStyle}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenus;
