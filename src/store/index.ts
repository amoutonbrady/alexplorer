import {
	createState,
	createContext,
	useContext,
	createSignal,
	createEffect,
	onCleanup,
} from "solid-js";
import { SetStateFunction, Wrapped } from "solid-js/types/state";
import * as Comlink from "comlink";
import { Gtfs } from "../typings/gtfs";
import { FilterTableType } from "../workers/table";

type StoreType = {
	gtfs: Wrapped<Gtfs>;
	setGtfs: SetStateFunction<Gtfs>;
	route: () => string;
	isReady: () => boolean;
	tableComputation: Comlink.Remote<{
		filterTable: (data: string[][], search?: string) => string[][];
	}>;
};

const StoreCtx = createContext<StoreType>(null);

export const createStore = ({ children }) => {
	const [gtfs, setGtfs] = createState<Gtfs>({});
	const [isReady, setIsReady] = createSignal(false);
	const [route, setRoute] = createSignal("/");

	const store = {
		gtfs,
		setGtfs,
		isReady,
		route,
		tableComputation: Comlink.wrap<{ filterTable: FilterTableType }>(
			new Worker("../workers/table.ts"),
		),
	};

	window.location.hash = "#/";

	const onHashChange = () => {
		if (!window.location.hash.startsWith("#/")) return void 0;
		setRoute(window.location.hash.slice(1));
	};

	window.addEventListener("hashchange", onHashChange);

	createEffect(() => {
		if (gtfs.stops) {
			setIsReady(true);
			window.location.hash = "#/agency";
		}
	});

	onCleanup(() => {
		window.removeEventListener("hashchange", onHashChange);
	});

	return StoreCtx.Provider({ children, value: store });
};

export const useStore = () => {
	return useContext(StoreCtx);
};
