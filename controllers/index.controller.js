const User = require("../models/user");
const Family = require("../models/family");
const responseHandler = require("../utils");
exports.createUser = async function (req, res, next) {
  try {
    req.body.photograph = req.file.filename;

    let user = await User.create(req.body);

    // Create a family only if a family array is not empty
    if (req.body.family !== "") {
      req.body.family.map(
        async (data) =>
          await Family.create(Object.assign(data, { owner: user._id }))
      );
    }
    let payload = await User.aggregate([
      {
        $match: {
          email: req.body.email,
        },
      },
      {
        $lookup: {
          from: "families",
          localField: "_id",
          foreignField: "owner",
          as: "family_members",
        },
      },
    ]);
    return responseHandler(
      res,
      201,
      "Success",
      "User Created Successfully",
      ...payload
    );
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async function (req, res, next) {
  let payload = await User.aggregate([
    {
      $lookup: {
        from: "families",
        localField: "_id",
        foreignField: "owner",
        as: "family_members",
      },
    },
  ]);
  return responseHandler(
    res,
    201,
    "Success",
    "Data fetched successfully",
    payload
  );
};

exports.getUserDataByEmail = async function (req, res, next) {
  let payload = await User.aggregate([
    {
      $match: {
        email: req.params.email,
      },
    },
    {
      $lookup: {
        from: "families",
        localField: "_id",
        foreignField: "owner",
        as: "family_members",
      },
    },
  ]);
  return responseHandler(
    res,
    201,
    "Success",
    "Data fetched successfully",
    payload
  );
};
