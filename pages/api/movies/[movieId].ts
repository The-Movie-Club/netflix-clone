//dynamic routes need to be in a nested api folder since the file names is how it builds the route
//the index.js file in that folder will be used as the main route

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);
    //query comes from the fact the route name includes []....ex: [movieId].ts
    const { movieId } = req.query;
    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    if (!movieId) {
      throw new Error("Invalid ID");
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Invalid ID");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
