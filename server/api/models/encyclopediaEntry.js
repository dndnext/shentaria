const mongoose = require("mongoose");

const EncyclopediaEntrySchema = new mongoose.Schema(
  {
    name: { type: "string" },
    coverImage: { type: "string" },
    content: { type: "string" },
    categories: [String],
    tags: [String],
    createdBy: mongoose.ObjectId,
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("EncyclopediaEntry", EncyclopediaEntrySchema);
