import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WatchPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className="w-full h-full bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="w-full h-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default WatchPage;
