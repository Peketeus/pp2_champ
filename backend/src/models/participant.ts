import { Schema, Types } from "mongoose";

/**
 * Participant of the competition
 */
export interface Participant {
  userId?: Types.ObjectId;
  score: number; // score = participants - rank (if hasLargestFish === true {+1 point})
  rank?: number;
  hasLargestFish?: boolean; // For a bonus point
}

export const ParticipantSchema = new Schema<Participant>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number },
    hasLargestFish: { type: Boolean, default: false },
  }
);