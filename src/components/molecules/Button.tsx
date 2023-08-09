import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonStyle = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	$style?: ButtonStyle;
}

export const Button: React.FC<ButtonProps> = ({
	$style = 'primary',
	children,
	...props
}) => (
	<ButtonStyled
		$style={$style}
		type={'button'}
		tabIndex={0}
		{...props}
	>
		<Flair $style={$style} />
		<Children>{children}</Children>
	</ButtonStyled>
);

const ButtonStyled = styled.button<ButtonProps>`
	position: relative;

	border: 1px solid rgba(255, 255, 255, 0.3);
	background: rgba(255, 255, 255, 0.2);
	border-radius: 8px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	color: white;
	padding: 7px 12px;
	font-size: 1rem;
	cursor: pointer;
	overflow: hidden;

	${p => p.$style === 'danger' && css`
		border: 1px solid rgba(255, 70, 70, 0.3);
		color: rgb(255, 208, 208);
	`}

	&:hover {
		background: rgba(255, 255, 255, 0.35);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	&:focus {
		background: rgba(255, 255, 255, 0.35);
		outline: 2px solid rgba(255, 255, 255, 0.4);
	}
`;

const Flair = styled.div<{ $style: ButtonStyle }>`
	position: absolute;
	top: 0; bottom: 0; left: 0; right: 0;
	opacity: 0.15;

	${p => p.$style === 'secondary' && css`background: white;`}
	${p => p.$style === 'danger' && css`background: red;`}
`;

const Children = styled.div`
	position: relative;
`;
