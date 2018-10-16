const mongoose = require("mongoose");

const IconSchema = new mongoose.Schema(
  {
    name: { type: "string" },
    url: { type: "string", default: "/static/markers/default.png" },
    anchor: { type: [], default: [0, 0] },
    size: { type: [], default: [10, 10] },
    popupAnchor: { type: [], default: [5, 5] },
    createdBy: mongoose.ObjectId,
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Icon", IconSchema);
