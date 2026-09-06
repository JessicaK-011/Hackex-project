const Problem = require("../models/problemModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.getAllProblems = catchAsync(async (req, res, next) => {
  const problems = await Problem.find({});
  if (!problems || problems.length === 0)
    return next(new AppError("No problems found.Please try again later", 404));
  res.status(200).json({
    status: "success",
    results: problems.length,
    problems,
  });
});

exports.getProblem = catchAsync(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);
  if (!problem)
    return next(new AppError("No problem found.Please try again later", 404));
  res.status(200).json({
    status: "success",
    problem,
  });
});

exports.addProblem = catchAsync(async (req, res, next) => {
  const { title, description, constraints, sampleInput, sampleOutput, tag } =
    req.body;
  const newProblem = {
    title,
    description,
    constraints,
    sampleInput,
    sampleOutput,
    tag,
  };
  const problem = await Problem.create(newProblem);
  res.status(200).json({
    status: "success",
    problem,
  });
});
