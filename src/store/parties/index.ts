import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PartiesState, Party, initialPartiesState } from './types';
import { generateRandomColor, generateRandomId, generateRandomPartyName } from '../../utils/generation';
import { addHours, subHours } from 'date-fns';

export const partiesSlice = createSlice({
	name: '@ade-planner/global/parties',
	initialState: initialPartiesState,
	reducers: {
		importParties: (_, { payload }: PayloadAction<PartiesState>) => {
			setStateInFragment(payload);

			return payload;
		},
		createStartingParty: (state, { payload }: PayloadAction<string | undefined>) => {
			const id = payload ?? generateRandomId();
			const now = new Date();

			state[id] = {
				id,
				name: generateRandomPartyName(),
				location: 'Some dodgy warehouse',
				accent: generateRandomColor(),
				startsAt: subHours(now, 2),
				endsAt: addHours(now, 6),
			};

			setStateInFragment(state);
		},
		updateParty: (state, { payload }: PayloadAction<Party>) => {
			state[payload.id] = payload;

			setStateInFragment(state);
		},
		removeParty: (state, { payload }: PayloadAction<string>) => {
			state[payload] = void 0;

			setStateInFragment(state);
		},
	},
});

export const partiesActions = partiesSlice.actions;

function setStateInFragment(state: PartiesState) {
	window.location.hash = btoa(JSON.stringify(state));
}
