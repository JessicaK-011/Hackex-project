const express = require("express");

const router = express.Router();

const problemController = require("../controllers/problemController");
// Fetches every problem.
router.get("/allProblems", problemController.getAllProblems);
// Creates a new problem using data sent in req.body.
router.post("/addProblem", problemController.addProblem);
// Uses a route parameter (:id). Whatever value is placed in the URL (like /getProblem/65a123) is extracted inside the controller as req.params.id.
router.get("/getProblem/:id", problemController.getProblem);
module.exports = router;
