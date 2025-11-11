import { Schema, Types } from "mongoose";
import { Participant } from "../resources/types/participant"

export const ParticipantSchema = new Schema<Participant>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number },
  hasLargestFish: { type: Boolean, default: false },
});
