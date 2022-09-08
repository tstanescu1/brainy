import { connectToDatabase } from "../../../services/mongoDB"


export default async function handler(req, res) {

    const { db } = await connectToDatabase();
    const { body } = req
    const { payload, collection } = body

    await db
        .collection(body.collection)
        .find({ userEmail: body.userEmail})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray()
        .then(result => {
            const conversations = JSON.parse(JSON.stringify(result))
            return res.status(200).json({ result: "success", data: conversations })
          });

          //return JSON.parse(JSON.stringify(conversationHistory))
        //res.status(200).json({ result: "success"})

        //res.json(conversationHistory); //displays a list when going to route.
    // return {
    //     props: {
    //         conversationHistory: JSON.parse(JSON.stringify(conversationHistory)),
    //     },

};