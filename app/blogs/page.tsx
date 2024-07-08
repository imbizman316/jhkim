import React, { Suspense } from "react";
import Diary from "../(components)/Diary";
import Loading from "../(components)/Loading";

function BlogPage() {
  // function showDiary(): JSX.IntrinsicElements {
  //   setTimeout(() => {
  //     return <Diary />;
  //   }, 2000);
  // }

  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<Loading />}>
        <Diary />
      </Suspense>
    </div>
  );
}

export default BlogPage;
