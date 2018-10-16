const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: "string" },
    description: { type: "string" },
    coverImage: { type: "string" },
    gms: [mongoose.ObjectId],
    players: [mongoose.ObjectId],
    createdBy: mongoose.ObjectId,
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Campaign", CampaignSchema);
