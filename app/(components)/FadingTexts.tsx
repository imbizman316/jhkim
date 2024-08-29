import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import videos1 from "../../public/videos/video_2024-08-30_03-03-15.mp4";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

function FirstHeader() {
  return (
    <div className="text-4xl font-bold w-[50%]">
      A writer, producer, thinker and drinker
    </div>
  );
}

function VideoPlay() {
  return (
    <div>
      <div className="flex w-[500px] justify-end">
        <div className="text-4xl font-bold flex justify-center items-center">
          His hobbies
        </div>
        <video width="200" height="240" autoPlay loop muted>
          <source
            src="/videos/video_2024-08-30_03-03-27.mp4"
            type="video/mp4"
          />
        </video>
        <Image
          className=""
          src="/images/photo_2024-08-30_03-36-21.jpg"
          alt="jh_working"
          width={170}
          height={200}
        />
      </div>
      <div className="w-[500px]">
        <video width="500" height="240" autoPlay loop muted>
          <source
            src="/videos/video_2024-08-30_03-03-15.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

function FadingTexts() {
  return (
    <div className="mt-[14em] flex justify-center flex-col items-center">
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="flex justify-center h-[400px]"
      >
        <FirstHeader />
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        className="flex justify-center h-auto"
      >
        <VideoPlay />
      </motion.div>
    </div>
  );
}

export default FadingTexts;
