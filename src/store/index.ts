import { combineReducers, Store } from 'redux';
import {
	initialPartiesState,
	PartiesState,
} from './parties/types';
import {
	initialModeState,
	ModeState,
} from './mode/types';
import { modeSlice } from './mode';
import { partiesSlice } from './parties';
import { configureStore } from '@reduxjs/toolkit';
import { EditingState, initialEditingState } from './editing/types';
import { editingSlice } from './editing';

export interface ApplicationState {
	global: {
		editing: EditingState;
		mode: ModeState,
		parties: PartiesState,
	};
}

function createRootReducer() {
	return combineReducers<ApplicationState>({
		global: combineReducers({
			editing: editingSlice.reducer,
			mode: modeSlice.reducer,
			parties: partiesSlice.reducer,
		}),
	});
}

function createInitialState(): ApplicationState {
	return {
		global: {
			editing: initialEditingState,
			mode: initialModeState,
			parties: initialPartiesState,
		}
	};
}

export function createApplicationStore(): Store<ApplicationState> {
	const store = configureStore({
		reducer: createRootReducer(),
		devTools: true,
		preloadedState: createInitialState(),
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			serializableCheck: false,
		}),
	});

	return store;
}
