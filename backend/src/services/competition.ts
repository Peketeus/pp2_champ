import { Competition, CompetitionType, Season, TimeOfDay } from "../models/competition";
import lakes from "../resources/lakes";
import { GameMode, GameDuration } from "../resources/types/gameSettings";

type GameDurationType = {
  time: GameDuration
  max: number
  used: number
}

/**
 * Luo joukon kilpailuja annettujen pelimuotojen ja niiden maksimimäärien perusteella.
 * @param allowedGameModes Sallitut pelimuodot ja niiden maksimimäärät: [{ mode: GameMode, max: number }]
 * @param allowedDurations Sallitut kisanpituudet ja niiden maksimimäärät: [{ time: GameDuration, max: number }]
 * @param count Arvottavien kisojen määrä
 * @returns Competition[]
 */

export function createRandomCompetitions(
	allowedGameModes: { mode: GameMode; max: number }[],
    allowedDurations: { time: GameDuration; max: number }[],
	count: number
): Competition[] {
	const times: TimeOfDay[] = ["Morning", "Afternoon", "Evening", "Night"];
	const seasons: Season[] = ["Autumn", "Winter", "Spring"];
  let usableLakes = lakes.map(lake => lake)

	function pickRandom<T>(arr: T[]): T {
		if (arr.length === 0) throw new Error("Taulukko on tyhjä");
		return arr[Math.floor(Math.random() * arr.length)]!;
	}

	function pickRandomTime(arr: GameDurationType[]): number {
		if (!arr.length) throw new Error("Taulukko on tyhjä");
        const randomIndex = Math.floor(Math.random() * arr.length);
        const value = arr[randomIndex]!;
        const time = value.time;

        return time;
	}

	// Laske sallittujen pelimuotojen ja kisapituuksien jäljellä olevat määrät
	const modeCounts = allowedGameModes.map(m => ({ ...m, used: 0 }));
	const timeCounts: GameDurationType[] = allowedDurations.map(m => ({ ...m, used: 0 }));
	const competitions: Competition[] = [];

	for (let i = 0; i < count; i++) {
		// Valitse satunnainen pelimuoto, jossa ei olla ylitetty maksimia
		const availableModes = modeCounts.filter(m => m.used < m.max);
		if (availableModes.length === 0) break;
		const modeObj = pickRandom(availableModes);
		const mode = modeObj.mode;

		// Valitse järvet, joissa pelimuoto on sallittu
		let validLakes = usableLakes.filter(lake => {
			// Jos pelimuoto on yöpelimuoto, järven pitää tukea yötä ja pelimuotoa
			const isNightMode = lake.supportedNightModes?.includes(mode);
			if (isNightMode) return lake.isNight;
			// Muuten pelimuoto pitää löytyä supportedGamemodes
			return lake.supportedGamemodes?.includes(mode);
		});
		if (validLakes.length === 0) continue;
		const lake = pickRandom(validLakes);

		// Valitse päiväaika (jos yöpelimuoto, vain "Night")
		let time: TimeOfDay;
		if (lake.supportedNightModes?.includes(mode)) {
			time = "Night";
		} else {
			time = pickRandom(times.filter(t => t !== "Night"));
		}

		competitions.push({
			lake: lake.name,
			timeOfDay: time,
			season: pickRandom(seasons),
			durationMinutes: pickRandomTime(timeCounts),
			type: mode,
			participants: []
		});
        usableLakes = usableLakes.filter(listLake => listLake.name !== lake.name)
		modeObj.used++;
	}

	return competitions;
}
