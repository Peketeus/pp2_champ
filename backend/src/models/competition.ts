import { Schema } from "mongoose";
import { ParticipantSchema } from "./participant.js";
import type { Participant } from "./participant.js";

export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";
export type Season = "Autumn" | "Winter" | "Spring";
export type CompetitionType = "normal"; // TODO: Lisää kaikki muodot tähän

export interface Competition {
  _id?: any;
  lake: string;
  timeOfDay?: TimeOfDay;
  season?: Season;
  durationMinutes: number;
  type?: CompetitionType;
  participants: Participant[];
}

export const CompetitionSchema = new Schema<Competition>(
  {
    lake: { type: String, required: true },
    timeOfDay: { type: String, required: true },
    season: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    type: { type: String, required: true },
    participants: { type: [ParticipantSchema], default: [] }
  }
);