import { TournamentModel } from "../models/tournament";

// user, participants[], int kisat, modes[], boolean nights,

/**
 * Generoi turnauksen kisat satunnaisesti.
 * @param user Käyttäjä, joka generoi turnauksen
 * @param kisat Kisojen määrä
 * @param modes Pelimuotojen lista
 * @param nights Onko yöturnaus
 * @returns Turnauksen kisat
 */
export function generoiTurnaus(
  user: any,
  kisat: number,
  modes: string[],
  nights: boolean
): any[] {
  TournamentModel.create({
    ownerId: user,
  });

  return [];
}

// handler
// luo kisat
// alustaa turnauksen luo kisojen perusteella
// lähtettää sen
