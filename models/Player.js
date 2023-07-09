import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },

    // token: {
    //   type: String,
    // },
    // confirmed: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", PlayerSchema);

export default Player;
