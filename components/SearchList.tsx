import useInfoModal from "@/hooks/useInfoModal";
import Link from "next/link";
import React from "react";

interface SearchListProps {
  movies?: MovieType[];
}
const SearchList: React.FC<SearchListProps> = ({ movies }) => {
  const { openModal } = useInfoModal();
  return (
    <ul
      className="rounded-md 
                w-full 
                text-md 
                text-white 
                bg-neutral-700
                p-2
                mt-2
                maxH-64
                "
    >
      {movies?.map((movie) => (
        <li
          onClick={() => openModal(movie.id)}
          className="flex items-center mb-2 cursor-pointer hover:text-red-700 transition rounded-md"
          key={movie.id}
        >
          <img
            className="w-10 h-10 object-cover mr-1 rounded-sm"
            src={movie.thumbnailUrl}
            alt="movie"
          />
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
