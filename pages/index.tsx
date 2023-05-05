import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// function that is run before rendering the component
// uses built in logic to fetch the context created with useCurrentUser.ts
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  //if there is not a current session (meaning someone is logged in) redirect to sign in
  //thus stopping users from reaching the site without loggin in
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

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title={"Trending Now"} />
        <MovieList data={favorites} title={"My List"} />
      </div>
    </>
  );
}
