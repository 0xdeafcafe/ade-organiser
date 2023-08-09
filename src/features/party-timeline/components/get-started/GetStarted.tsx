import React from 'react';
import { styled } from 'styled-components';
import { Button } from '../../../../components/molecules/Button';
import { useDispatch } from 'react-redux';
import { partiesActions } from '../../../../store/parties';
import { modeActions } from '../../../../store/mode';

export const GetStarted: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<Container>
			<Card>
				<Emoji>{'👋'}</Emoji>

				<Text>{'Click below to get started with organising your party weekend'}</Text>

				<Button onClick={() => {
					dispatch(partiesActions.createStartingParty());
					dispatch(modeActions.setMode('editing'));
				}}>{'Get started!'}</Button>
			</Card>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 20px 0;
	padding: 20px 40px;

	background: rgba(255, 255, 255, 0.2);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Emoji = styled.div`
	font-size: 3rem;
	width: min-content;
	align-self: center;

	background: rgba(255, 255, 255, 0.2);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.3);

	padding: 10px;
`;
const Text = styled.div`
	margin-top: 10px;
	margin-bottom: 20px;
`;
