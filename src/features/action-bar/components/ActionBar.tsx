import React, { MouseEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../../store/redux';
import { useDispatch } from 'react-redux';
import { partiesActions } from '../../../store/parties';
import { modeActions } from '../../../store/mode';

interface BackgroundIndicatorState {
	width: number;
	left: number;
}

export const ActionBar: React.FC = () => {
	const dispatch = useDispatch();
	const mode = useAppSelector(s => s.global.mode);
	const hasParties = Object.keys(useAppSelector(s => s.global.parties)).length > 0;

	const [showBgIndicator, setShowBgIndicator] = useState(false);
	const [bgIndicatorState, setBgIndicatorState] = useState<BackgroundIndicatorState | null>(null);

	useEffect(() => {
		// Handle mode changes
	}, [hasParties]);

	if (!hasParties) return null;

	function handleOnMouseEnter(event: MouseEvent<HTMLButtonElement>) {
		const { left: childLeft, width } = event.currentTarget.getBoundingClientRect();
		const { left: parentLeft } = event.currentTarget.parentElement.getBoundingClientRect();

		setShowBgIndicator(true);
		setBgIndicatorState({ width, left: childLeft - parentLeft });
	}

	function handleOnMouseLeave() {
		setShowBgIndicator(false);
		setBgIndicatorState(null);
	}

	if (mode === 'hidden') return null;

	return (
		<Container onMouseLeave={handleOnMouseLeave}>
			<BackgroundIndicator
				$show={showBgIndicator}
				$state={bgIndicatorState}
			/>
			{mode === 'viewing' && (
				<React.Fragment>
					<Item
						onClick={() => {
							dispatch(partiesActions.createStartingParty());
							dispatch(modeActions.setMode('editing'));
						}}
						onMouseEnter={handleOnMouseEnter}
					>
						{'Create'}
					</Item>
					<Item
						onClick={() => dispatch(modeActions.setMode('editing'))}
						onMouseEnter={handleOnMouseEnter}
					>
						{'Edit'}
					</Item>
				</React.Fragment>
			)}

			<Item
				onClick={() => window.location.href = '/'}
				onMouseEnter={handleOnMouseEnter}
			>
				{'Reset'}
			</Item>
			<Item
				onClick={() => dispatch(modeActions.setMode('viewing'))}
				onMouseEnter={handleOnMouseEnter}
			>
				{'Share'}
			</Item>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	bottom: 18px; right: 18px;
	padding: 4px;
	display: flex;
	gap: 4px;

	background: rgba(255, 255, 255, 0.175);
	border-radius: 5px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.3);
`;

const BackgroundIndicator = styled.div<{ $state: BackgroundIndicatorState | null; $show: boolean; }>`
	position: absolute;
	pointer-events: none;
	top: 4px;
	bottom: 4px;

	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 5px;

	opacity: 0;

	${p => p.$state && css`
		opacity: 1;
		transform: translateX(${p.$state.left - 4}px);

		width: ${p.$state.width - 4}px;
	`}

	transition: all .2s ease;
`;

const Item = styled.button`
	position: relative;
	background: none;
	border: none;
	color: ${p => p.theme.ui.textOnSurfaceBackground};

	padding-top: 4px;
	font-size: 0.8rem;
	font-weight: 500;

	cursor: pointer;
`;
