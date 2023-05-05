// import NextAuth from "next-auth/next";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";

//imports for other providers. again built in with next we have authentication with these
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
  providers: [
    //syntax for github which aligns with .env
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    //syntax for github which aligns with .env
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    //imported Object that takes 3 args. id, name, and cred
    Credentials({
      id: "credentials",
      name: "Credentials",

      //credentials map out the actual credentials to be taken and
      //their its label and type
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        //using the credentials set from above for logic moving forward
        //GT - if either of these were not added throw the error
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        // declaring a user that is built from the async prisma function that fetches a user who has email credential matches
        //the set passed in on line 27. !!!!!!NEW SYNTAX!!!!!
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        //if there is not a user with those credentials or the that user doesnt have a password(no user was created) throw an error
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        //the compare method below needs to be imported from bcrypt. It compares a regular string to a hashed string in
        //secret for me and the users benefit
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        //if the async function above doesnt return true its the wrong password
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        // if the code reaches this line it should be an existing email and password that was input correctly which authorizes a user. yay
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  //will show us errors and logs in terminal when in development
  debug: process.env.NODE_ENV === "development",
  //add adapter
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
