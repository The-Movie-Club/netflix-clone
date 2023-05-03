import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

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
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-4xl text-green-500">Netflix Clone</h1>
      <p className="text-white"> Logged in as : {user?.name} </p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout!
      </button>
    </>
  );
}
