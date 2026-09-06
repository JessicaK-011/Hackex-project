const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Contest = require("../models/contestModel");

exports.createContest = catchAsync(async (req, res, next) => {
  const { title, description, problems, startTime, endTime } = req.body;

  if (!title || !description || !problems || !startTime || !endTime) {
    return next(
      new AppError(
        "All fields (title, description, problems, startTime, endTime) are required",
        400,
      ),
    );
  }

  try {
    const contest = new Contest({
      title,
      description,
      problems,
      startTime,
      endTime,
    });
    await contest.save();

    res.status(201).json({
      status: "success",
      data: contest,
    });
  } catch (error) {
    console.error("Error creating contest:", error);
    next(
      new AppError("Failed to create contest. Please try again later.", 500),
    );
  }
});

exports.allContests = catchAsync(async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString();
    const contests = await Contest.find({
      endTime: { $gt: currentDate },
    }).populate("problems");
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contests", error });
  }
});

exports.getContest = catchAsync(async (req, res, next) => {
  const contest = await Contest.findById(req.params.id).populate("problems");

  if (!contest) {
    return next(new AppError("No contest found with that ID", 404));
  }

  const currentTime = Date.now();
  const startTime = new Date(contest.startTime).getTime();
  const endTime = new Date(contest.endTime).getTime();

  // Contest has not started yet
  if (currentTime < startTime) {
    return next(new AppError("This contest has not started yet!", 403));
  }

  // Contest has ended
  if (currentTime > endTime) {
    return next(new AppError("This contest has already ended!", 403));
  }

  res.status(200).json({
    status: "success",
    contest,
  });
});
