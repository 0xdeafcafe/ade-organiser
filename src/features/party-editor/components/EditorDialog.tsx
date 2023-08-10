import React, { useEffect, useState } from 'react';
import Dialog from '../../../components/molecules/Dialog';
import { css, styled } from 'styled-components';
import { useAppSelector } from '../../../store/redux';
import { useDispatch } from 'react-redux';
import { partiesActions as actions } from '../../../store/parties';
import { Button } from '../../../components/molecules/Button';
import { ButtonGroup as ButtonGroupOriginal } from '../../../components/molecules/ButtonGroup';
import { isAfter, isBefore } from 'date-fns';

interface EditorDialogProps {
	id: string | null;
	onClose: () => void;
}

export const EditorDialog: React.FC<EditorDialogProps> = ({ id, onClose }) => {
	const dispatch = useDispatch();
	const party = useAppSelector(s => s.global.parties[id]);

	const [partyName, setPartyName] = useState(() => party?.name);
	const [partyLocation, setPartyLocation] = useState(() => party?.location);
	const [partyStartsAt, setPartyStartsAt] = useState(() => party?.startsAt.toISOString());
	const [partyEndsAt, setPartyEndsAt] = useState(() => party?.endsAt.toISOString());

	const [partyStartValid, setPartyStartValid] = useState(() => true);
	const [partyEndValid, setPartyEndValid] = useState(() => true);

	useEffect(() => {
		if (!id) return;
	}, [id]);

	useEffect(() => {
		function handler(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;

			e.stopPropagation();
			e.preventDefault();
			onClose();
		}

		window.addEventListener('keydown', handler);

		return () => window.removeEventListener('keydown', handler);
	})

	if (!id) return null;

	function handleSubmit() {
		// Validate before update

		dispatch(actions.updateParty({
			...party,
			name: partyName,
			location: partyLocation,
			startsAt: new Date(partyStartsAt),
			endsAt: new Date(partyEndsAt),
		}));

		onClose();
	}

	function handleRemove() {
		dispatch(actions.removeParty(party.id));
		onClose();
	}

	return (
		<Dialog open onClose={() => onClose()}>
			<Title>{'Edit party'}</Title>
			<SubTitle>{'Aliqua sit officia officia amet enim laboris occaecat incididunt nisi'}</SubTitle>

			<form onSubmit={e => {
				e.preventDefault();
				handleSubmit();
			}}>
				<FormGroup>
					<Label htmlFor={'partyName'}>{'Party name'}</Label>
					<Input
						autoFocus
						name={'partyName'}
						type={'text'}
						value={partyName}
						onChange={e => setPartyName(e.currentTarget.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor={'partyVenue'}>{'Venue'}</Label>
					<Input
						name={'partyVenue'}
						type={'text'}
						value={partyLocation}
						onChange={e => setPartyLocation(e.currentTarget.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor={'partyStartsAt'}>{'Party starting 🎉'}</Label>
					<Input
						$invalid={!partyStartValid}
						name={'partyStartsAt'}
						type={'text'}
						value={partyStartsAt}
						onChange={e => {
							let valid = isIso8601(e.currentTarget.value);

							if (valid && partyEndValid)
								valid = isBefore(new Date(e.currentTarget.value), new Date(partyEndsAt));

							setPartyStartValid(valid);
							setPartyStartsAt(e.currentTarget.value);
						}}
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor={'partyEndsAt'}>{'Party closing 🥺'}</Label>
					<Input
						$invalid={!partyEndValid}
						name={'partyEndsAt'}
						type={'text'}
						value={partyEndsAt}
						onChange={e => {
							let valid = isIso8601(e.currentTarget.value);

							if (valid && partyStartValid)
								valid = isAfter(new Date(e.currentTarget.value), new Date(partyStartsAt));

							setPartyEndValid(valid);
							setPartyEndsAt(e.currentTarget.value);
						}}
					/>
				</FormGroup>

				<ButtonGroup>
					<Button
						disabled={!partyStartValid || !partyEndValid}
						onClick={handleSubmit}
					>
						{'Save'}
					</Button>
					<Button $style={'secondary'} onClick={onClose}>
						{'Cancel'}
					</Button>
					<Button $style={'danger'} onClick={handleRemove}>
						{'Delete'}
					</Button>
				</ButtonGroup>
			</form>
		</Dialog>
	);
};

const Title = styled.div`
	font-size: 1.5rem;
	font-weight: 600;
	user-select: none;
	cursor: default;
`;
const SubTitle = styled.div`
	font-size: 0.8rem;
	user-select: none;
	cursor: default;
	margin: 5px 0 15px 0;
`;

const FormGroup = styled.div`
	margin-bottom: 20px;
`;
const Label = styled.label`
	display: block;
	font-weight: 600;
	font-size: 0.8rem;
	margin-bottom: 4px;
`;
const Input = styled.input<{ $invalid?: boolean }>`
	display: block;
	width: calc(100% - 12px);

	padding: 6px;

	color: ${p => p.theme.ui.textOnSurfaceBackground};
	background: rgba(255, 255, 255, 0.17);
	border-radius: 5px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(12.9px);
	-webkit-backdrop-filter: blur(12.9px);
	border: 1px solid rgba(255, 255, 255, 0.4);

	${p => p.$invalid && css`
		border: 1px solid rgba(239, 34, 34, 0.4);
	`}
`;

const ButtonGroup = styled(ButtonGroupOriginal)`
	justify-content: flex-end;
`;

function isIso8601(value: string) {
	return new Date(value).toJSON() === value;
}
