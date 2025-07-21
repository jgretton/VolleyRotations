export interface GuideContent {
	slug?: string;
	title: string;
	system: string;
	phase: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	description: string;
	content: object;
}

export interface BasePositions {
	[position: string]: {
		x: number;
		y: number;
	};
}

export interface PositionData {
	role: string;
	x: number;
	y: number;
}
