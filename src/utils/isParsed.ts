import { ParseResult } from "papaparse";

export const isParsed = (data: any): data is ParseResult => {
	return typeof data !== "string";
};
