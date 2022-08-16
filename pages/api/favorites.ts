import { connectToDatabase } from "../../services/mongoDB";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const favorites = await db
    .collection("favorites")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(favorites);
};