import { useStore } from "../store";
import { Table } from "../components/Table";
import { isParsed } from "../utils/isParsed";

export const Routes = () => {
	const store = useStore();

	return isParsed(store.gtfs.routes) ? (
		<Table data={store.gtfs.routes.data} />
	) : (
		<p>Parsing the data, please wait a sec...</p>
	);
};
