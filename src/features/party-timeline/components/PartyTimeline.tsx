import React from 'react';
import { format } from 'date-fns';
import styled, { css } from 'styled-components';
import { generatePartyIndex, generateTimelineIndicatorState } from '../utils/timeline-indicator-state';
import { useAppSelector } from '../../../store/redux';
import { Party } from '../../../store/parties/types';
import { EditorDialog } from '../../party-editor/components/EditorDialog';
import { generateWaypoints } from '../utils/waypoints';
import { GetStarted } from './get-started/GetStarted';
import { toHexAlpha } from '../../../design-system/utils';
import { generateRandomPartyMessage } from '../../../utils/generation';
import { useDispatch } from 'react-redux';
import { editingActions } from '../../../store/editing';

export const PartyTimeline: React.FC = () => {
	const dispatch = useDispatch();
	const mode = useAppSelector(s => s.global.mode);
	const partyState = useAppSelector(s => s.global.parties);
	const editingId = useAppSelector(s => s.global.editing.editingId);

	const partyWaypoints = generateWaypoints(partyState);

	if (partyWaypoints === null)
		return <GetStarted />;

	const {
		partyCount,
		firstPartyStartDate,
		sortedPartiesByStart,
		hourHourSegmentCount
		
	} = partyWaypoints;
	const timelineIndicatorState = generateTimelineIndicatorState(
		partyWaypoints.firstPartyStartDate,
		partyWaypoints.lastPartyEndDate,
	);

	return (
		<Container $halfHourSegments={hourHourSegmentCount} $partiesCount={partyCount}>
			{Boolean(editingId) && (
				<EditorDialog
					id={editingId}
					onClose={() => dispatch(editingActions.clearEditing())}
				/>
			)}

			{timelineIndicatorState.map((_, i) => (
				<TimelineBarSection
					$hourDivider={i % 4 === 0}
					$rowCount={partyCount}
					$segmentIndex={i}
					key={i}
				/>
			))}

			{timelineIndicatorState.map((s, i) => (
				<TimelineIndicatorSection $segmentIndex={i} key={`${s.date}${s.day}${s.time}`}>
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
				const { length, startIndex } = generatePartyIndex(firstPartyStartDate, p.startsAt, p.endsAt);

				return (
					<React.Fragment key={p.id}>
						<PartyTimelineIntro $partyIndex={i}>
							<PartyTimelineIntroName>{p.name}</PartyTimelineIntroName>
							<PartyTimelineIntroLocation>{p.location}</PartyTimelineIntroLocation>
						</PartyTimelineIntro>
						<PartyTimelineActiveBar
							$disabled={mode !== 'editing'}
							$party={p}
							$partyIndex={i}
							$length={length}
							$timeIndex={startIndex}
							onClick={() => {
								if (mode === 'editing')
									dispatch(editingActions.startEditing(p.id));
							}}
						>
							<PartyTimelineTimes>{format(p.startsAt, 'HH:mm')}{' - '}{format(p.endsAt, 'HH:mm')}</PartyTimelineTimes>
							<PartyTimelineQuote>{generateRandomPartyMessage()}</PartyTimelineQuote>
						</PartyTimelineActiveBar>
					</React.Fragment>
				);
			})}

			{timelineIndicatorState.map((s, i) => (
				<TimelineIndicatorSection
					$footer
					$partyCount={partyCount}
					$segmentIndex={i}
					key={`${s.date}${s.day}${s.time}`}
				>
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
	user-select: none;
`;
const TimelineIndicatorTime = styled.div`
	white-space: nowrap;
	font-size: 0.8rem;
	opacity: 0.8;
	user-select: none;
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
const PartyTimelineActiveBar = styled.div<{
	$disabled: boolean;
	$partyIndex: number;
	$party: Party;
	$timeIndex: number;
	$length: number;
}>`
	grid-column: ${p => p.$timeIndex + 2} / ${p => (p.$timeIndex + 2) + (p.$length)};
	grid-row: ${p => p.$partyIndex + 2};

	margin: 12px 6px;

	display: flex;
	flex-direction: column;
	gap: 1px;
	align-items: center;
	justify-content: center;

	border-radius: 4px;
	background: ${p => toHexAlpha(p.$party.accent, 0.6)};
	backdrop-filter: blur(10px);

	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);

	user-select: none;

	font-size: 0.9rem;

	transition: all .2s ease;

	${p => !p.$disabled && css`
		&:hover {
			cursor: pointer;
			background: ${p.$party.accent}66;
		}
	`}
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
