import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { DesignSystemProvider, GlobalStyle } from './design-system';
import { WebEntrypoint } from './entrypoints/Web';
import { createApplicationStore } from './store';
import { Theme } from './design-system/types';

const store = createApplicationStore();

const ApplicationEntrypoint: React.FC = () => {
	const [theme] = useState<Theme>('dark');

	return (
		<Provider store={store}>
			<DesignSystemProvider themeKey={theme}>
				<GlobalStyle />
				<WebEntrypoint />
			</DesignSystemProvider>
		</Provider>
	);
};

createRoot(document.getElementById('root')!).render(
	<ApplicationEntrypoint />,
);
