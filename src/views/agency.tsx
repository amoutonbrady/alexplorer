import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const Agency = () => {
	const store = useStore();

	return isParsed(store.gtfs.agency) ? (
		<Table data={store.gtfs.agency.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
