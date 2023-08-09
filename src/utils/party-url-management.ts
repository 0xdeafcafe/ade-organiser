import { PartiesState } from '../store/parties/types';

export function parseUrlToPartyState(): PartiesState {
	const fragmentValue = window.location.hash.substring(1);

	if (!fragmentValue)
		return {};

	const decodedFragmentValue = parseFragmentValue(fragmentValue);

	if (!decodedFragmentValue)
		return defaultStateAndClearFragment();

	try {
		// TODO(afr): Validate format (schema?) of `decodedFragmentValue`
		return validatePartyInformation(decodedFragmentValue);
	} catch (error) {
		console.error('Unable to parse party information in fragment:', error);

		return defaultStateAndClearFragment();
	}
}

function defaultStateAndClearFragment(): PartiesState {
	window.location.hash = '';
	history.replaceState({}, '', window.location.href.slice(0, -1));

	return { };
}

function parseFragmentValue(fragmentValue: string) {
	try {
		return atob(fragmentValue);
	} catch (error) {
		console.error('Unable to decode fragment value:', error);

		return null;
	}
}

function validatePartyInformation(decodedPartyInformation: string): PartiesState {
	const partyInformation = JSON.parse(decodedPartyInformation) as PartiesState;

	if (typeof partyInformation !== 'object' || Array.isArray(partyInformation) || partyInformation === null)
		throw new TypeError('Party information format not object');

	return Object.values(partyInformation).reduce<PartiesState>((acc, val, i) => {
		if (typeof val.id !== 'string' || !val.id)
			throw new TypeError(`Party id is not valid p_idx:${i}`);

		if (typeof val.name !== 'string' || !val.name)
			throw new TypeError(`Party name is not valid p_idx:${i}`);

		if (typeof val.location !== 'string' || !val.location)
			throw new TypeError(`Party location is not valid p_idx:${i}`);

		if (typeof val.accent !== 'string' || !val.accent)
			throw new TypeError(`Party accent is not valid p_idx:${i}`);

		if (typeof val.startsAt !== 'string' || !val.startsAt)
			throw new TypeError(`Party startsAt is not valid p_idx:${i}`);

		if (typeof val.endsAt !== 'string' || !val.endsAt)
			throw new TypeError(`Party endsAt is not valid p_idx:${i}`);

		acc[val.id] = {
			id: val.id,
			name: val.name,
			location: val.location,
			accent: val.accent,
			startsAt: new Date(val.startsAt),
			endsAt: new Date(val.endsAt),
		};

		return acc;
	}, { });
}
