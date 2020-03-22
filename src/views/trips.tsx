import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const Trips = () => {
	const store = useStore();

	return isParsed(store.gtfs.trips) ? (
		<Table data={store.gtfs.trips.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
