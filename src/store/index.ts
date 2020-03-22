import {
	createState,
	createContext,
	useContext,
	createSignal,
	createEffect,
	createDependentEffect,
	onCleanup,
} from "solid-js";
import { Gtfs } from "../typings/gtfs";
import { SetStateFunction, Wrapped } from "solid-js/types/state";

type StoreType = {
	gtfs: Wrapped<Gtfs>;
	setGtfs: SetStateFunction<Gtfs>;
	route: () => string;
	isReady: () => boolean;
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
	};

	window.location.hash = "#/";

	const onHashChange = () => {
		if (!window.location.hash.startsWith("#/")) return void 0;
		setRoute(window.location.hash.slice(1));
	};

	window.addEventListener("hashchange", onHashChange);

	createEffect(() => {
		console.log(gtfs);
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
