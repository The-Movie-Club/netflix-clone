// since this route will not have a child/nested route it should be a direct child of the api folder
//this file connexts the user who started the session

import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //this route only allows a get request to retrieve the current user
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
