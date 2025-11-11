import { Types } from "mongoose"

/**
 * Participant of the competition
 */
export interface Participant {
  userId: Types.ObjectId;
  score: number; // score = participants - rank (if hasLargestFish === true {+1 point})
  rank: number;
  hasLargestFish: boolean | null; // For a bonus point
}