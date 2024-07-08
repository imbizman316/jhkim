import React from "react";

function Footer() {
  return (
    <div className="min-h-20 flex flex-col justify-center items-center gap-1 py-4">
      <h1 className="text-lg font-bold tracking-widest">J.H.Kim</h1>
      <div className="flex flex-row gap-3 text-sm font-semibold">
        <h1>Privacy Policy</h1>
        <h1>|</h1>
        <h1>Terms of Use</h1>
      </div>
      <h1 className="text-sm">&#169; 2024 J.H.Kim All Right Reserved.</h1>
    </div>
  );
}

export default Footer;
