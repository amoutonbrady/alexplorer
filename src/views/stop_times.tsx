import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const StopTimes = () => {
	const store = useStore();

	return isParsed(store.gtfs.stop_times) ? (
		<Table data={store.gtfs.stop_times.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
