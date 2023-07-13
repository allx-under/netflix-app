import React, { useCallback } from "react";

import useBillboard from "@/hooks/useBillboard";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import useFavorites from "@/hooks/useFavorites";

interface BillboardProps {
  isMyList?: boolean;
}
const Billboard: React.FC<BillboardProps> = ({ isMyList }) => {
  const { data: favorite } = useFavorites();

  const { data: random } = useBillboard();

  let movie: {
    id: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
  };

  if (isMyList && favorite.length) {
    movie = favorite[0];
  } else {
    movie = random;
  }

  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(movie?.id);
  }, [movie?.id, openModal]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        src={movie?.videoUrl}
        autoPlay
        muted
        loop
        poster={movie?.thumbnailUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {movie?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie?.id} />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-xl font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
