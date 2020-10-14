const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const familySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    relationship: String,
    age: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
