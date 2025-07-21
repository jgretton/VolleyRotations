export interface GuideContent {
	title: string;
	system: string;
	phase: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	description: string;
	content: object;
}
