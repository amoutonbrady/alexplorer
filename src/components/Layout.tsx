import { For } from "solid-js/dom";
import { Link } from "./Link";
import { useStore } from "../store";
import { routes } from "../router";

export const Layout = (props: any) => {
	const store = useStore();

	return (
		<div id="app" class="layout grid h-screen w-screen relative">
			<header class="bg-gray-800 text-gray-100 px-6 py-4 flex justify-between col-span-2 border-b border-gray-900">
				<h1>ALEXPLORER</h1>

				<nav>
					<ul class="flex">
						<li>
							<Link to="/">Upload a new GTFS</Link>
						</li>
						<li class="ml-4">
							<Link to="/about">About</Link>
						</li>
					</ul>
				</nav>
			</header>

			<aside class="bg-gray-800 flex text-gray-100 border-r border-gray-900">
				<nav class="w-full" classList={{ hidden: !store.isReady() }}>
					<ul class="w-full">
						<For each={Object.entries(routes)}>
							{([name, link]) => (
								<li
									class="w-full"
									classList={{
										"bg-gray-700": link === store.route(),
									}}
								>
									<Link
										to={link}
										class="w-full px-6 py-4 block text-sm uppercase tracking-wide font-semibold hover:bg-gray-700 active:bg-gray-600"
									>
										{name}
									</Link>
								</li>
							)}
						</For>
					</ul>
				</nav>
			</aside>

			<main class="h-full overflow-auto bg-gray-500 px-12 relative">
				<div class="max-w-6xl mx-auto bg-gray-600 bg-gray-600 mt-12">
					{props.children}
				</div>
			</main>
		</div>
	);
};
