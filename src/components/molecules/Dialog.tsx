import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const dialogContainerId = 'generic-dialog-container';
let dialogStack = 0;

interface DialogProps {
	open: boolean;
	onClose: () => void;
}

const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = props => {
	const { children, onClose } = props;
	const [identifier, setIdentifier] = useState<string>();
	const stackIndex = useRef(dialogStack + 1);

	useEffect(() => {
		const ident = Math.random().toString();
		const container = document.getElementById(dialogContainerId);
		const element = document.createElement('div');

		element.setAttribute('id', ident);
		container!.appendChild(element);
		setIdentifier(ident);

		// eslint-disable-next-line no-plusplus
		dialogStack++;

		return () => {
			const element = document.getElementById(identifier!);

			element?.remove();

			// eslint-disable-next-line no-plusplus
			dialogStack--;
		};
	}, []);

	if (!identifier)
		return null;

	return createPortal(
		<Container
			backdrop={stackIndex.current === 1}
			onClick={() => onClose()}
		>
			<Wrapper onClick={e => e.stopPropagation()}>
				{children}
			</Wrapper>
		</Container>,
		document.getElementById(identifier!)!,
	);
};

const Container = styled.div<{ backdrop?: boolean }>`
	position: fixed;
	top: 0; bottom: 0; left: 0; right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${p => p.theme.ui.surface}AA;
	pointer-events: all;

	z-index: 102;

	max-height: 100vh;
	max-width: 100vw;
	overflow-y: scroll;
`;

const Wrapper = styled.div`
	background: rgba(255, 255, 255, 0.1);
	border-radius: 16px;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	border: 1px solid rgba(255, 255, 255, 0.2);

	padding: 40px;
	padding-bottom: 20px;
	min-width: 500px;
`;

export default Dialog;
