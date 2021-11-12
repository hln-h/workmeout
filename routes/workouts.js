var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//SAVE a workout to the DB
router.post("/", async (req, res, next) => {
  try {
    const { bodyPart, time, equipment, exerciseApiIds } = req.body;
    await db(
      `INSERT INTO workouts (bodyPart, time, equipment, exerciseApiIds) VALUES ("${bodyPart}", "${time}", "${equipment}", "${exerciseApiIds}"); `
    );
    const results = await db("SELECT * FROM workouts;");
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});
// DELETE a workout from the DB
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await db(`DELETE FROM workouts WHERE id =${+id};`);
    const results = await db("SELECT * FROM workouts;");
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
