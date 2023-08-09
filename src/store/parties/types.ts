export interface Party {
	id: string;
	name: string;
	location: string;
	accent: string;
	startsAt: Date;
	endsAt: Date;
}

export interface PartiesState {
	[key: string]: Party | undefined;
}

export const initialPartiesState: PartiesState = {};
