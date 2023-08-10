import { eachMinuteOfInterval, format } from "date-fns";

export interface TimelineIndicatorSegment {
	day: string;
	date: string;
	shouldRenderDate: boolean;
	time: string;
}

export interface PartyIndex {
	startIndex: number;
	length: number;
}

export function generateTimelineIndicatorState(startDate: Date, endDate: Date): TimelineIndicatorSegment[] {
	return eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 30 })
		.map<TimelineIndicatorSegment>((value, index, array) => {
			const hasPrevious = index > 0;
			const day = format(value, 'do');
			const date = format(value, 'eeee');
			const time = format(value, 'HH:mm');

			if (!hasPrevious) {
				return {
					shouldRenderDate: true,
					date,
					day,
					time,
				};
			}

			const previousDate = format(array[index - 1], 'eeee');
			const previousDay = format(array[index - 1], 'do');

			return {
				shouldRenderDate: previousDate !== date || previousDay !== day,
				date,
				day,
				time,
			};
		});
}

export function generatePartyIndex(startDate: Date, partyStartDate: Date, partyEndDate: Date): PartyIndex {
	const steps = eachMinuteOfInterval({ start: partyStartDate, end: partyEndDate }, { step: 30 }).length - 1;
	const paddingSteps = (() => {
		if (startDate.getTime() === partyStartDate.getTime()) return 0;
		
		return eachMinuteOfInterval({ start: startDate, end: partyStartDate }, { step: 30 }).length - 1;
	})();

	return {
		startIndex: paddingSteps,
		length: steps,
	};
}
