// import next builtin type def for the req since I am about to use it
// import next method for starting sessions
// prismadb because a user model from my db will need to be used
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  // starting the requested session
  const session = await getSession({
    req,
  });

  // wont start a session if not logged in
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // since the above logic passes we can tie the session to whichever users' email matches the req
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //if none match must not be a user in our db so throw an error to prevent hackin
  if (!currentUser) {
    throw new Error("not signed in");
  }

  //start the session with the user
  return { currentUser };
};

export default serverAuth;
