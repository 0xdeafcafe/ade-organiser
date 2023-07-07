export type AsyncState<T> = T extends void ? {
	fetching: boolean;
	response: void;
	error?: Error;
} : {
	fetching: boolean;
	response?: T;
	error?: Error;
};

export interface AsyncMapState<T> {
	[key: string]: AsyncState<T>;
}

export type RequestIdPayload<T> = { requestId: string } & T;

export interface MetaPayloadAction<T> {
	type: string;
	meta: { ident: string };
	payload: T;
}

export const createInitialAsyncState = () => ({ fetching: true, error: void 0, response: void 0 });
