import ObjectID from "bson-objectid"
import { connectToDatabase } from "../../../services/mongoDB"

export default async function handler(req, res) {

  const { db } = await connectToDatabase()
  const { body } = req
  const { payload, collection } = body

  // try {
  //   await db.collection(collection).insertOne(payload)
  //   res.status(200).json({ result: "success" })
  // } catch (e) {
  //   console.error(e)
  //   res.status(500).send(e)
  // }

  //Below code works to update by using method PATCH
console.log('ObjectI',ObjectID("62e8035eecd6664849d877a6"))
  db.collection(collection).updateOne({
  _id: ObjectID("62e8035eecd6664849d877a6")
}, {
  $set: {
      answer: "three six five"
  }
})
}



