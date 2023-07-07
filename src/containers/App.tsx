import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ActionBar } from '../features/action-bar/components/ActionBar';
import { PartyTimeline } from '../features/party-timeline/components/PartyTimeline';

export const App: React.FC = () => {
	return (
		<React.Fragment>
			<Background />
			<Container>
				<Title>
					<strong>{'ADE'}</strong>
					{' organiser'}
				</Title>
				<PartyTimeline />
			</Container>
			<ActionBar />
		</React.Fragment>
	);
};

const pulse = keyframes`
	0% {
		transform: scale(0.8);
		opacity: 1
	}

	25% {
		transform: scale(1.1);
	}

	50% {
		transform: scale(0.5);
		opacity: 0.8;
	}

	75% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(0.8);
		opacity: 1;
	}
`;

const Container = styled.div`
	position: relative;
	margin: 0;
	padding: 100px 0 0 30px;
`;
const Title = styled.div`
	font-size: 3.75rem;
	font-weight: 300;

	text-transform: uppercase;
`;
const Background = styled.div`
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;

	background: url('/images/bg-2.png');
	background-position: center;
	background-size: cover;

	transform: scale(0.8);
	animation: ${pulse} 40s infinite;

	filter: blur(150px);
	pointer-events: none;
`;
