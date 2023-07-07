import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

export interface ApplicationState {
	
}

function createRootReducer() {
	return combineReducers<ApplicationState>({});
}

function* rootSaga() {
	yield all([
	]);
}

function createInitialState(): ApplicationState {
	return {};
}

export function configureStore(): Store<ApplicationState> {
	const initialState = createInitialState();
	const composeEnhancers = composeWithDevTools({});

	const sagaMiddleware = createSagaMiddleware({
		// onError: error => handleUnhandledError(error),
	});

	const store = createStore(
		createRootReducer(),
		initialState,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
