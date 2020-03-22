import { ParseResult } from "papaparse";

export type Gtfs = {
	agency?: string | ParseResult;
	calendar?: string | ParseResult;
	calendar_dates?: string | ParseResult;
	stops?: string | ParseResult;
	stop_times?: string | ParseResult;
	trips?: string | ParseResult;
	routes?: string | ParseResult;
};
