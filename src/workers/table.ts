import * as Comlink from "comlink";

function filterTable(data: string[][], search = "") {
	return (
		data
			// Skipping the first row because it's the header
			.slice(1)
			// Filtering the one that doersn't match our current search term
			.filter((row: string[]) =>
				row.some((cell) => cell.toLowerCase().includes(search)),
			)
			// Mapping over each result to inject some HTML on the matching sequence
			.map((row: string[]) =>
				row.map((cell) => {
					if (!cell) return "—";

					return cell.toLowerCase().includes(search)
						? cell.replace(
								new RegExp(`(${search})`, "gi"),
								'<span class="border-b-2 border-red-500">$1</span>',
						  )
						: cell;
				}),
			)
	);
}

export type FilterTableType = typeof filterTable;

Comlink.expose(filterTable);
