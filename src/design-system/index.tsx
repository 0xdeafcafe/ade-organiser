import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { DesignSystem, Theme } from './types';
import fonts from './fonts';
import { darkTheme } from './themes';

const GlobalStyle = createGlobalStyle`
	* {
		-webkit-font-smoothing: subpixel-antialiased;
	}

	html, body {
		font-family: ${p => p.theme.fonts.default};
		background-color: ${p => p.theme.ui.background};
		color: ${p => p.theme.ui.textOnSurfaceBackground};

		margin: 0;
		padding: 0;
	}
`;

function createDesignSystem(themeKey: Theme): DesignSystem {
	return {
		theme: themeKey,
		ui: darkTheme,

		fonts,
	};
}

const DesignSystemProvider: React.FC<React.PropsWithChildren<{ themeKey: Theme }>> = ({ children, themeKey }) => (
	<ThemeProvider theme={createDesignSystem(themeKey)}>{children}</ThemeProvider>
);

export {
	DesignSystemProvider,
	GlobalStyle,
};
