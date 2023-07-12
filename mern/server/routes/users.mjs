import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the users .
router.get("/", async (req, res) => {
  let collection = await db.collection("Users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single user by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("Users");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  // This section will help you create a new user.
router.post("/", async (req, res) => {
    let newDocument = {
      emailid: req.body.emailid,
      password: req.body.password,
    };
    let collection = await db.collection("Users");
    let result = await collection.insertOne(newDocument);
    console.log(result)
    res.send(result).status(201);
  });

  // This section will help you update a user by id.
router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
      $set: {
        emailid: req.body.emailid,
        password: req.body.password,
      }
    };
  
    let collection = await db.collection("Users");
    let result = await collection.updateOne(query, updates);
  
    res.send(result).status(200);
  });
  
  // This section will help you delete a user
  router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
  
    const collection = db.collection("Users");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });
  
  export default router;