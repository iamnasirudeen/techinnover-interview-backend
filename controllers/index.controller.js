const User = require("../models/user");
const Family = require("../models/family");
const responseHandler = require("../utils");
exports.createUser = async function (req, res, next) {
  try {
    // parse family object cos it is coming as a string from the client
    req.body.family = JSON.parse(req.body.family);
    req.body.photograph = req.file.filename;
    let user = await User.create(req.body);

    console.log(user)

    // Create a family only if a family array is not empty
    if (req.body.family !== undefined && req.body.family !== "") {
      req.body.family.map(
        async (data) =>
          await Family.create({
            name: data.name,
            relationship: data.relationship,
            age: data.age,
            owner: user._id,
          })
      );
    }

    // send the user data and the family members data back to the user
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
    console.log(error.message);
    return responseHandler(
      res,
      500,
      "Error",
      "An error occured",
      error.message
    );
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
