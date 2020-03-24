import { For, Show } from "solid-js/dom";
import { createSignal, createState, createEffect, unwrap } from "solid-js";
import { useStore } from "../store";

type PropsType = {
	data: string[][];
};

export const Table = (props: PropsType) => {
	const [pages, setPages] = createSignal([]);
	const [loading, setLoading] = createSignal(false);
	const store = useStore();

	// Data related to the pagination with default values
	const [pagination, setPagination] = createState({
		page: 0,
		perPage: 15,
		maxPerPage: 0,
		search: "",
		data: [],
	});

	// Compute the pagination
	createEffect(async () => {
		setLoading(true);
		// Compute the slice of data to show based on filters
		const start = pagination.page * pagination.perPage;

		const filtered = await store.tableComputation.filterTable(
			unwrap(props.data),
			// @ts-ignore
			unwrap(pagination.search),
		);

		setPagination((state) => {
			state.data = filtered.slice(start, start + pagination.perPage);
			state.maxPerPage = filtered.length;
			if (state.perPage > filtered.length)
				state.perPage = filtered.length;
		});

		// Compute the number of pages for the pagination module
		// Prevent division by 0
		const length =
			!!filtered.length && !!pagination.perPage
				? Math.ceil(filtered.length / pagination.perPage)
				: 1;
		const numberOfPages = Array.from({ length }, (_, i) => i);
		setPages(numberOfPages);
		setLoading(false);
	});

	const updatePerPage = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setPagination((pagination) => {
			pagination.perPage = Number.parseInt(target.value, 10);
			pagination.page = 0;
		});
	};

	const updateSearch = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setPagination((pagination) => {
			pagination.search = target.value.toLowerCase();
			pagination.page = 0;
		});
	};

	return (
		<>
			<div class="flex justify-between">
				<input
					type="text"
					placeholder="Search in this set of data..."
					value={pagination.search}
					onInput={updateSearch}
					class="bg-gray-800 text-gray-100 px-4 py-3"
				/>

				{/* FIXME: Search with low results bring the number of perPage down.
                    The problem is that it doesn't scale up automatically afterwards.
                */}
				<input
					type="number"
					value={pagination.perPage}
					onInput={updatePerPage}
					min="1"
					max={pagination.maxPerPage}
					class="bg-gray-800 text-gray-100 px-4 py-3"
				/>
			</div>

			<Show when={!loading()}>
				<div class="overflow-x-auto">
					{/* Maybe we don't want the text of each row to wrap */}
					<table class="w-full mt-4">
						<thead class=" text-gray-100">
							<tr class="font-bold text-lg uppercase">
								<For each={props.data[0]}>
									{(header) => (
										<th class="p-3 sticky top-0 bg-gray-800">
											<span>{header}</span>
											<button></button>
										</th>
									)}
								</For>
							</tr>
						</thead>
						<tbody class="text-gray-200 font-semibold">
							<For each={[...pagination.data.entries()]}>
								{([index, row]) => (
									<tr
										classList={{
											"bg-gray-600": index % 2 === 0,
											"bg-gray-700": index % 2 !== 0,
										}}
									>
										<For each={row}>
											{(value: string) => (
												<td
													class="p-2"
													innerHTML={value}
												></td>
											)}
										</For>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</div>

				<div class="flex mt-4 justify-end">
					<button
						onClick={() =>
							setPagination("page", pagination.page - 1)
						}
						class="px-4 py-3 bg-gray-800 text-gray-100 hover:bg-gray-900 active:bg-black"
						classList={{ hidden: pagination.page === 0 }}
					>
						Previous page
					</button>

					<div class="mx-2 flex">
						<input
							type="number"
							value={pagination.page + 1}
							onInput={(e) =>
								setPagination(
									"page",
									parseInt(e.target.value, 10) - 1,
								)
							}
							class="w-24 bg-gray-800 text-gray-100 pl-4 py-3"
						/>
						<span class="bg-gray-800 text-gray-100 pl-1 pr-4 py-3">
							/{pages().length}
						</span>
					</div>

					<button
						onClick={() =>
							setPagination("page", pagination.page + 1)
						}
						class="px-4 py-3 bg-gray-800 text-gray-100 hover:bg-gray-900 active:bg-black"
						classList={{
							hidden: pagination.page === pages().length - 1,
						}}
					>
						Next page
					</button>
				</div>
			</Show>

			<Show when={loading()}>Loading...</Show>
		</>
	);
};
