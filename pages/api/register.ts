//todo - API to be reached when a user attempts to make an account

import bcrypt from "bcrypt";
//Next's type definitions for api calls 💪🏾
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //this is us only allowing post calls to this api route. This makes sense because we dont want users being able to
  //see all of our data.
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    //these items are being destructured from the post request's body
    const { email, name, password } = req.body;

    //checking if a user with that email exists in the db via prisma (Async)
    const existingUser = await prismadb.user.findUnique({
      where: {
        //shorthand for email: email,
        email,
      },
    });

    //if there is a user with that email send an error telling them they used that one for the free trial already 😂
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    //imported bcrypt method that encrypts the passwords recieved in the post call. I (the developer) still am not seeing
    //anyones personal passwords 👏🏾
    const hashedPassword = await bcrypt.hash(password, 12);

    //creating a user via the async prisma method. It expects all of the args established by the prisma schema.
    //so all attributes that arent default or optional need to be passed here
    const user = await prismadb.user.create({
      data: {
        //the white elements below are destructured. idk why that isnt more obvious
        email,
        name,
        hashedPassword,
        //isnt destrcutured above so it gets a default value
        image: "",
        //same but a dynamic default value
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
