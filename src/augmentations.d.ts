import { Store } from 'react-redux';

import 'vite/client';
import { ApplicationState } from './store';

declare global {
	interface Window {
		store: Store<ApplicationState>;
	}
}
