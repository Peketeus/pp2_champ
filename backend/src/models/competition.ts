import { Schema, model } from "mongoose";
import { ParticipantSchema } from "./participant";
import type { Participant } from "../resources/types/participant";
import { GameMode } from "../resources/types/gameSettings";

export const timeOfDayValues = ["Morning", "Afternoon", "Evening", "Night"] as const;
export type TimeOfDay = typeof timeOfDayValues[number];

export const seasonValues = ["Autumn", "Winter", "Spring"] as const;
export type Season = typeof seasonValues[number];

export type CompetitionType = GameMode;

export interface Competition {
  lake: string;
  timeOfDay: TimeOfDay;
  season: Season;
  durationMinutes: number;
  type: CompetitionType;
  participants: Participant[];
}

export const CompetitionSchema = new Schema<Competition>(
  {
    lake: { type: String, required: true },
    timeOfDay: { type: String, required: true, enum: timeOfDayValues },
    season: { type: String, required: true, enum: seasonValues },
    durationMinutes: { type: Number, required: true },
    type: { type: String, required: true, enum: Object.values(GameMode) },
    participants: { type: [ParticipantSchema], default: [] }
  },
  { timestamps: true }
);

export const CompetitionModel = model<Competition>("Competition", CompetitionSchema)