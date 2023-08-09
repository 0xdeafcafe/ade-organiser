export function getPathNameBase() {
	const ghp = window.location.hostname === '0xdeafcafe.github.io';

	if (ghp)
		return `https://${window.location.origin}/ade-organiser/`;
	
	return '/';
}
