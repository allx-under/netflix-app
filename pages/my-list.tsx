import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";

import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard isMyList />
      <div className="pb-40">
        {favorites.length ? (
          <MovieList title="My list" data={favorites} />
        ) : (
          <h2 className="text-white text-md md:text-xl lg: text-2xl font-semibold mt-4 text-center">
            There is no movies in your list.
          </h2>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
