export const birdSpecies = [
	'Anhinga',
	'Albatross',
	'Kingfisher',
	'Blackbird',
	'Bluebird',
	'Canary',
	'Cockatoo',
	'Cockatiel',
	'Cormorant',
	'Crane',
	'Crow',
	'Cuckoo',
	'Dove',
	'Duck',
	'Eagle',
	'Falcon',
	'Flamingo',
	'Frigate',
	'Gallinule',
	'Goose',
	'Gull',
	'Hawk',
	'Ibis',
	'Ibis',
	'Kestrel',
	'Killdeer',
	'Kite',
	'Kiwi',
	'Lark',
	'Lovebird',
	'Meadowlark',
	'Myna',
	'Oriole',
	'Osprey',
	'Owl',
	'Parrot',
	'Pelican',
	'Penguin',
	'Quail',
	'Raven',
	'Roadrunner',
	'Robin',
	'Snowy egret',
	'Sparrow',
	'Stork',
	'Swallow',
	'Swan',
	'Swift',
	'Turkey',
	'Vulture',
	'Whippoorwill',
	'Woodpecker',
	'Wren',
];

export const musicalInstruments = [
	'Brass',
	'Drum machine',
	'Drums',
	'Guitar',
	'Keyboard',
	'Percussion',
	'Piano',
	'Saxophone',
	'Sequencer',
	'String',
	'Synthesizer',
	'Trombone',
	'Trumpet',
	'Tuba',
	'Violin',
	'Wind',
	'Xylophone',
];

export const palletHexColors = [
	'#711c91',
	'#ea00d9',
	'#0abdc6',
	'#133e7c',
	'#091833',
	'#d45d80'
];

export const partyMessages = [
	`It's a marathon, not a sprint`,
	`Maybe this would be a good time to get some water...`,
	`Don't forget to check the floor... 👀`,
	`Is this how your mother raised you..?`,
];

export function generateRandomPartyName() {
	const birdValue = getRandomIndex(birdSpecies);
	const instrumentValue = getRandomIndex(musicalInstruments);

	return `${birdValue} ${instrumentValue}`;
}

export function generateRandomColor() {
	return getRandomIndex(palletHexColors);
}

export function generateRandomPartyMessage() {
	return getRandomIndex(partyMessages);
}

function getRandomIndex<T>(list: T[]): T {
	const min = 0;
	const max = list.length;

	// The maximum is exclusive and the minimum is inclusive
	const index = Math.floor(Math.random() * (max - min) + min);

	return list[index];
}

export function generateRandomId() {
	return Math.floor(Math.random() * Date.now()).toString(10);
}
