import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../store/redux';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/molecules/Button';
import { partiesActions } from '../../../store/parties';
import { editingActions } from '../../../store/editing';
import { generateRandomId } from '../../../utils/generation';

export const ActionBarAdd: React.FC = () => {
	const dispatch = useDispatch();
	const mode = useAppSelector(s => s.global.mode);

	if (mode !== 'editing') return null;

	return (
		<Container>
			<Button onClick={() => {
				const id = generateRandomId();

				dispatch(partiesActions.createStartingParty(id));
				dispatch(editingActions.startEditing(id));
			}}>
				<ButtonText>{'+'}</ButtonText>
			</Button>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	bottom: 18px; left: 18px;
	gap: 4px;
`;

const ButtonText = styled.div`
	font-size: 20px;
`;
