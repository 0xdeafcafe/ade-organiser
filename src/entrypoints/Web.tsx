import React, { useEffect } from 'react';
import { App } from '../containers/App';
import { useDispatch } from 'react-redux';
import { parseUrlToPartyState } from '../utils/party-url-management';
import { modeActions } from '../store/mode';
import { partiesActions } from '../store/parties';
import { getPathNameBase } from '../utils/url';

export const WebEntrypoint: React.FC = () => {
	const dispatch = useDispatch();
	const { pathname, hash: fragment } = window.location;

	// Handle loading in with parties in the fragment
	useEffect(() => {
		const partiesState = parseUrlToPartyState();

		if (Object.keys(partiesState).length === 0) return;

		dispatch(partiesActions.importParties(partiesState));
		dispatch(modeActions.setMode('viewing'));
	}, []);

	// Faux router...
	useEffect(() => {
		if (pathname !== getPathNameBase()) {
			window.location.replace(`${getPathNameBase()}${fragment}`);

			return;
		}
	}, [pathname, fragment]);

	return <App />;
};
