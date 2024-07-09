import Link from "next/link";
import React from "react";
import { navBarStyle } from "./Navbar";

function AuthLinks() {
  const authenticated: boolean = true;

  return (
    <>
      {authenticated ? (
        <>
          <Link className={navBarStyle} href="/write/new">
            Write
          </Link>
          <span>Logout</span>
        </>
      ) : (
        <Link className={navBarStyle} href="/login">
          Login
        </Link>
      )}
    </>
  );
}

export default AuthLinks;
