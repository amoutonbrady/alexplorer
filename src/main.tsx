import { render, Show, Switch, Match } from "solid-js/dom";
import { useStore, createStore } from "./store";
import { Home } from "./views/home";
import { Layout } from "./components/Layout";
import { Stops } from "./views/stops";
import { Agency } from "./views/agency";
import { CalendarDates } from "./views/calendar_dates";
import { StopTimes } from "./views/stop_times";
import { Trips } from "./views/trips";
import { Calendar } from "./views/calendar";
import { Routes } from "./views/routes";

const App = () => {
	const store = useStore();

	return (
		<Layout>
			<Show when={!store.isReady()}>
				<Home />
			</Show>

			<Switch>
				<Match
					when={store.isReady() && store.route() === "/"}
					children={Home}
				/>

				<Match
					when={store.isReady() && store.route() === "/agency"}
					children={Agency}
				/>
				<Match
					when={
						store.isReady() && store.route() === "/calendar-dates"
					}
					children={CalendarDates}
				/>
				<Match
					when={store.isReady() && store.route() === "/stop-times"}
					children={StopTimes}
				/>
				<Match
					when={store.isReady() && store.route() === "/trips"}
					children={Trips}
				/>
				<Match
					when={store.isReady() && store.route() === "/stops"}
					children={Stops}
				/>
				<Match
					when={store.isReady() && store.route() === "/calendar"}
					children={Calendar}
				/>
				<Match
					when={store.isReady() && store.route() === "/routes"}
					children={Routes}
				/>
			</Switch>
		</Layout>
	);
};

render(() => createStore({ children: App }), document.getElementById("app"));
