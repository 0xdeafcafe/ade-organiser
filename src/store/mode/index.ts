import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModeState, initialModeState } from './types';

export const modeSlice = createSlice({
	name: '@ade-planner/global/mode',
	initialState: initialModeState,
	reducers: {
		setMode: (_, action: PayloadAction<ModeState>) => {
			return action.payload;
		},
	},
});

export const modeActions = modeSlice.actions;
