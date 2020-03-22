import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const CalendarDates = () => {
	const store = useStore();

	return isParsed(store.gtfs.calendar_dates) ? (
		<Table data={store.gtfs.calendar_dates.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
