import React, { useEffect } from 'react';
import { App } from '../containers/App';

export const WebEntrypoint: React.FC = () => {
	const { pathname, hash: fragment } = window.location;

	// Faux router...
	useEffect(() => {
		if (pathname !== '/') {
			window.location.replace(`/${fragment}`);

			return;
		}
	}, [pathname, fragment]);

	return <App />;
};
