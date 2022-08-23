import ObjectID from "bson-objectid"
import { connectToDatabase } from "../../../services/mongoDB"

export default async function handler(req, res) {

  const { db } = await connectToDatabase()
  const { body } = req
  const { payload, collection } = body

  try {
    await db.collection(collection).updateOne({
      _id: ObjectID(body.id)
    }, {
      $pull: {
        "conversation": { "timestamp": payload.timestamp }
      }
    }).then(() => {
      return res.status(200).json({ result: "deleted"});
    })

  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}



