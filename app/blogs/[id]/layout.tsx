import React from "react";

function ReadingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default ReadingLayout;
