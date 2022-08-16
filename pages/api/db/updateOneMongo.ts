import ObjectID from "bson-objectid"
import { connectToDatabase } from "../../../services/mongoDB"

export default async function handler(req, res) {

  const { db } = await connectToDatabase()
  const { body } = req
  const { payload, collection, id } = body

  await db.collection(collection).updateOne({
  _id: ObjectID(id)
}, {
  //$set to replace
  $push: {
      conversation: payload
  }
}).then(() => {
  res.status(200).json({ result: "success" })
});
}



