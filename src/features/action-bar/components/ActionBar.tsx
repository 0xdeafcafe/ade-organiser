import React from 'react';
import styled from 'styled-components';

export const ActionBar: React.FC = () => {
	return (
		<Container>
			{'create/edit/share'}
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	bottom: 18px; right: 18px;

	color: white;
	backdrop-filter: blur(10px);
	background: ${p => p.theme.ui.surfaceFill}50;
	border-bottom: 1px solid ${p => p.theme.ui.backgroundBorderSeparator};
	border-radius: 5px;
	padding: 8px;
`;
