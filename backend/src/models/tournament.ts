import { Schema, model, Document, Types } from "mongoose";
import { CompetitionSchema } from "./competition.js";
import type { Competition } from "./competition.js";

export type TournamentStatus = "CREATED" | "ONGOING" | "FINISHED";

export interface ITournament extends Document {
  ownerId: Types.ObjectId;
  name: string;
  status: TournamentStatus;
  competitions: Competition[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TournamentSchema = new Schema<ITournament>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["CREATED", "ONGOING", "FINISHED"],
      default: "CREATED",
    },
    competitions: { type: [CompetitionSchema], default: [] },
  },
  { timestamps: true }
);

export const TournamentModel = model<ITournament>("Tournament", TournamentSchema);