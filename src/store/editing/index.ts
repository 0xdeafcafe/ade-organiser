import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialEditingState } from './types';

export const editingSlice = createSlice({
	name: '@ade-planner/global/editing',
	initialState: initialEditingState,
	reducers: {
		clearEditing: state => {
			state.editingId = void 0;
		},
		startEditing: (state, { payload }: PayloadAction<string>) => {
			state.editingId = payload;
		},
	},
});

export const editingActions = editingSlice.actions;
