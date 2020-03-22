import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const Stops = () => {
	const store = useStore();

	return isParsed(store.gtfs.stops) ? (
		<Table data={store.gtfs.stops.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
