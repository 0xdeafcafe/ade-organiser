export function getPathNameBase() {
	const ghp = window.location.hostname === '0xdeafcafe.github.io';

	if (ghp)
		return `${window.location.origin}/ade-organiser/`;
	
	return '/';
}
