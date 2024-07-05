import Link from "next/link";
import React from "react";

function AuthLinks() {
  const authenticated: boolean = true;

  return (
    <>
      {authenticated ? (
        <>
          <Link href="/write/new">Write</Link>
          <span>Logout</span>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}

export default AuthLinks;
