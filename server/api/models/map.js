const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema(
  {
    name: { type: "string" },
    icon: { type: "string" },
    description: { type: "string" },
    markers: [
      {
        text: { type: "string" },
        icon: { type: "string" },
        position: [],
        visibleLayers: { type: [], default: ["*"] },
        existingLayers: { type: [], default: ["*"] },
        type: { type: "string", default: "popup" },
      },
    ],
    layers: [],
    defaultZoom: { type: "number", default: 1 },
    defaultPosition: { type: [], default: [0, 0] },
    createdBy: mongoose.ObjectId,
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("Map", MapSchema);
