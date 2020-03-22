import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const Calendar = () => {
	const store = useStore();

	return isParsed(store.gtfs.calendar) ? (
		<Table data={store.gtfs.calendar.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
