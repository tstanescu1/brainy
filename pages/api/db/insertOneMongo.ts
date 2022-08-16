import { connectToDatabase } from "../../../services/mongoDB"

export default async function handler(req, res) {

  const { db } = await connectToDatabase()
  const { body } = req
  const { payload, collection } = body

  try {
    await db.collection(collection).insertOne(payload).then(result => {
      res.status(200).json({ result: "success", id: result.insertedId.toString() })
    });

  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}
