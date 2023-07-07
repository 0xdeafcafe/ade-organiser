import React from 'react';
import { differenceInMinutes, format } from 'date-fns';
import styled from 'styled-components';
import { sortIso8601 } from '../../../utils/sort';
import { generatePartyIndex, generateTimelineIndicatorState } from '../../../utils/timeline-indicator-state';

interface Party {
	name: string;
	location: string;
	accent: string;
	startsAt: string;
	endsAt: string;
}

const parties: Party[] = [{
	name: 'DGTL Thuesday',
	location: 'NDSM werf',
	accent: '#d45d80',
	startsAt: '2023-10-19T22:00:00+01:00',
	endsAt: '2023-10-20T07:00:00+01:00',
}, {
	name: 'Pleinvrees feat. Nora en Pure',
	location: 'Heinekenkaade',
	accent: '#333399',
	startsAt: '2023-10-19T21:00:00+01:00',
	endsAt: '2023-10-20T05:00:00+01:00',
}, {
	name: 'Anjunadeep ADE',
	location: 'Shelter',
	accent: '#d45d80',
	startsAt: '2023-10-20T14:00:00+01:00',
	endsAt: '2023-10-20T20:00:00+01:00',
}, {
	name: 'ADE Hangover',
	location: 'NDSM',
	accent: '#2a2f43',
	startsAt: '2023-10-20T17:00:00+01:00',
	endsAt: '2023-10-20T22:00:00+01:00',
}, {
	name: 'Placeholder 1',
	location: 'Unknown',
	accent: '#33CC99',
	startsAt: '2023-10-21T23:00:00+01:00',
	endsAt: '2023-10-22T06:00:00+01:00',
}];

export const PartyTimeline: React.FC = () => {
	const sortedPartiesByStart = [...parties].sort(sortIso8601((p => p.startsAt), 'asc'));
	const sortedPartiesByEnd = [...parties].sort(sortIso8601((p => p.endsAt), 'desc'));
	const firstPartyStartDate = new Date(sortedPartiesByStart[0].startsAt);
	const lastPartyEndDate = new Date(sortedPartiesByEnd[0].endsAt);
	const partyDurationMinutes = differenceInMinutes(lastPartyEndDate, firstPartyStartDate);

	const hfSegments = Math.ceil(partyDurationMinutes / 30);
	const timelineIndicatorState = generateTimelineIndicatorState(firstPartyStartDate, lastPartyEndDate);

	return (
		<Container $halfHourSegments={hfSegments} $partiesCount={parties.length}>
			{timelineIndicatorState.map((_, i) => (
				<TimelineBarSection
					$hourDivider={i % 4 === 0}
					$rowCount={parties.length}
					$segmentIndex={i}
				/>
			))}

			{timelineIndicatorState.map((s, i) => (
				<TimelineIndicatorSection $segmentIndex={i}>
					<TimelineIndicatorTime>
						{s.time}
					</TimelineIndicatorTime>
					{s.shouldRenderDate && (
						<TimelineIndicatorDate>
							{s.date}
							{' '}
							<strong>{s.day}</strong>
						</TimelineIndicatorDate>
					)}
				</TimelineIndicatorSection>
			))}

			{sortedPartiesByStart.map((p, i) => {
				const startDate = new Date(p.startsAt);
				const endDate = new Date(p.endsAt);
				const { length, startIndex } = generatePartyIndex(firstPartyStartDate, startDate, endDate);

				return (
					<React.Fragment>
						<PartyTimelineIntro $partyIndex={i}>
							<PartyTimelineIntroName>{p.name}</PartyTimelineIntroName>
							<PartyTimelineIntroLocation>{p.location}</PartyTimelineIntroLocation>
						</PartyTimelineIntro>
						<PartyTimelineActiveBar
							$party={p}
							$partyIndex={i}
							$length={length}
							$timeIndex={startIndex}
						>
							<PartyTimelineTimes>{format(startDate, 'HH:mm')}{' - '}{format(endDate, 'HH:mm')}</PartyTimelineTimes>
							<PartyTimelineQuote>it's a marathon, not a sprint</PartyTimelineQuote>
						</PartyTimelineActiveBar>
					</React.Fragment>
				);
			})}

			{timelineIndicatorState.map((s, i) => (
				<TimelineIndicatorSection $footer $partyCount={parties.length} $segmentIndex={i}>
					<TimelineIndicatorTime>
						{s.time}
					</TimelineIndicatorTime>
					{s.shouldRenderDate && (
						<TimelineIndicatorDate>
							{s.date}
							{' '}
							<strong>{s.day}</strong>
						</TimelineIndicatorDate>
					)}
				</TimelineIndicatorSection>
			))}
		</Container>
	);
};

const Container = styled.div<{ $halfHourSegments: number; $partiesCount: number }>`
	margin: 30px 60px;

	display: grid;
	grid-template-columns: 200px repeat(${p => p.$halfHourSegments}, 60px);
	grid-template-rows: 40px repeat(${p => p.$partiesCount}, 80px) 40px;
`;

const TimelineBarSection = styled.div<{ $segmentIndex: number; $hourDivider: boolean; $rowCount: number }>`
	grid-column: ${p => p.$segmentIndex + 2};
	grid-row: 2 / ${p => p.$rowCount + 2};

	border-left: ${p => p.$hourDivider ? '3px' : '1px'} solid ${p => p.theme.ui.backgroundBorderSeparator};
`;

const TimelineIndicatorSection = styled.div<{ $footer?: boolean; $partyCount?: number; $segmentIndex: number }>`
	grid-column: ${p => p.$segmentIndex + 2};
	grid-row: ${p => p.$footer ? (p.$partyCount ?? 0) + 2 : 1};
	display: flex;
	gap: 5px;
	flex-direction: ${p => p.$footer ? 'column' : 'column-reverse'};
	justify-content: flex-start;

	user-select: none;
	cursor: default;

	margin-left: -0.98rem;
`;
const TimelineIndicatorDate = styled.div`
	white-space: nowrap;
	font-size: 1.1rem;
	opacity: 0.8;
`;
const TimelineIndicatorTime = styled.div`
	white-space: nowrap;
	font-size: 0.8rem;
	opacity: 0.8;
`;

const PartyTimelineIntro = styled.div<{ $partyIndex: number }>`
	grid-column: 1;
	grid-row: ${p => p.$partyIndex + 2};

	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
`;
const PartyTimelineIntroName = styled.abbr`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 1.2rem;

	text-decoration: none;
`;
const PartyTimelineIntroLocation = styled.abbr`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	text-transform: uppercase;
	font-weight: 500;
	font-size: 0.7rem;
	opacity: 0.7;

	text-decoration: none;
`;
const PartyTimelineActiveBar = styled.div<{ $partyIndex: number; $party: Party; $timeIndex: number; $length: number; }>`
	grid-column: ${p => p.$timeIndex + 2} / ${p => (p.$timeIndex + 2) + (p.$length)};
	grid-row: ${p => p.$partyIndex + 2};

	margin: 12px 6px;

	display: flex;
	flex-direction: column;
	gap: 1px;
	align-items: center;
	justify-content: center;

	border-radius: 8px;
	background: ${p => p.$party.accent}77;
	backdrop-filter: blur(100px);

	user-select: none;
	cursor: grab;

	font-size: 0.9rem;
`;
const PartyTimelineTimes = styled.div`
	font-size: 1.1rem;
	font-weight: 500;
`;
const PartyTimelineQuote = styled.div`
	font-size: 0.8rem;
	font-weight: 300;
	opacity: 0.7;
`;
