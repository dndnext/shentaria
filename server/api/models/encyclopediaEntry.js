const mongoose = require("mongoose");

const EncyclopediaEntrySchema = new mongoose.Schema(
  {
    encyclopedia: { type: mongoose.ObjectId, required: true },
    name: { type: "string", required: true },
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
