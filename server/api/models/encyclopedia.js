const mongoose = require("mongoose");

const EncyclopediaSchema = new mongoose.Schema(
  {
    name: { type: "string" },
    description: { type: "string" },
    coverImage: { type: "string" },
    createdBy: mongoose.ObjectId,
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Encyclopedia", EncyclopediaSchema);
