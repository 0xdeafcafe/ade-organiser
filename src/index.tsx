import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { DesignSystemProvider, GlobalStyle } from './design-system';
import { WebEntrypoint } from './entrypoints/Web';
import { configureStore } from './store';
import { Theme } from './design-system/types';

const store = configureStore();

const App: React.FC = () => {
	const [theme] = useState<Theme>('dark');

	return (
		<Provider store={store}>
			<base href={'./'} />
				<DesignSystemProvider themeKey={theme}>
					<GlobalStyle />
					<WebEntrypoint />
				</DesignSystemProvider>
		</Provider>
	);
};

createRoot(document.getElementById('root')!).render(<App />);
