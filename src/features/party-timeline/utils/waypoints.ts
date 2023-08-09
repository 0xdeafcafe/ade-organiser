import { differenceInMinutes } from 'date-fns';
import { Party, State } from '../../../store/parties/types';
import { sortIso8601 } from '../../../utils/sort';

interface PartyWaypoints {
	partyCount: number;

	sortedPartiesByStart: Party[],
	sortedPartiesByEnd: Party[],

	firstPartyStartDate: Date;
	lastPartyEndDate: Date;

	partyDurationMinutes: number;
	hourHourSegmentCount: number;
}

export function generateWaypoints(partyState: State['parties']): PartyWaypoints | null {
	const parties = Object.values(partyState);

	if (parties.length === 0)
		return null;

	const sortedPartiesByStart = [...parties].sort(sortIso8601((p => p.startsAt.toISOString()), 'asc'));
	const sortedPartiesByEnd = [...parties].sort(sortIso8601((p => p.endsAt.toISOString()), 'desc'));

	const firstPartyStartDate = sortedPartiesByStart[0].startsAt;
	const lastPartyEndDate = sortedPartiesByEnd[0].endsAt;

	const partyDurationMinutes = differenceInMinutes(lastPartyEndDate, firstPartyStartDate);
	const hourHourSegmentCount = Math.ceil(partyDurationMinutes / 30);

	return {
		partyCount: parties.length,

		sortedPartiesByStart,
		sortedPartiesByEnd,

		firstPartyStartDate,
		lastPartyEndDate,

		partyDurationMinutes,
		hourHourSegmentCount,
	};
}
