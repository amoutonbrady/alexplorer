import { Show } from "solid-js/dom";
import { createSignal } from "solid-js";

import { validateZipExtension } from "../utils/validateZipExtension";
import { prevent } from "../utils/preventDefault";
import { useStore } from "../store";
import { parse } from "papaparse";

export const Home = () => {
	const store = useStore();
	const [file, setFile] = createSignal<File | null>(null);
	const [error, setError] = createSignal("");

	const handleSubmit = async () => {
		// Reset the errors on submit
		setError("");

		if (!file() || !validateZipExtension(file())) {
			setError("Wrong file extension or empty file. Try again.");
			return void 0;
		}

		const body = new FormData();
		body.append("gtfs", file());

		const res = await fetch("http://localhost:3000/upload", {
			method: "POST",
			headers: {
				ContentType: "multipart/form-data",
			},
			body,
		}).then((r) => r.text());

		const parsed = JSON.parse(res) as Record<string, string>;

		store.setGtfs(
			Object.entries(parsed).reduce((acc, [k, v]) => {
				acc[k] = parse(v);

				return acc;
			}, {}),
		);
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		return void setFile(target.files[0]);
	};

	return (
		<form
			onSubmit={prevent(handleSubmit)}
			class="bg-gray-100 shadow overflow-hidden"
		>
			<h1 class="bg-gray-800 text-gray-100 px-6 py-4 font-bold tracking-wide text-lg">
				ALEXPLORER' - Upload page
			</h1>

			<Show when={!!error()}>
				<p class="bg-red-300 text-red-900 px-6 py-4 border border-red-800 shadow font-semibold">
					{error}
				</p>
			</Show>

			<div class="flex flex-col p-6">
				<label for="gtfs" class="block font-semibold text-sm uppercase">
					Upload GTFS in zip format
				</label>
				<input
					onChange={handleFileChange}
					type="file"
					name="gtfs"
					id="gtfs"
					accept=".zip"
					class="block mt-3"
					classList={{
						"border border-red-800 text-red-500": !!error(),
					}}
				/>

				<button
					type="submit"
					class="px-6 py-3 bg-gray-800 text-sm uppercase text-gray-100 shadow hover:bg-gray-900 hover:shadow-xl mt-6 ml-auto font-semibold"
				>
					Upload your GTFS now!
				</button>
			</div>
		</form>
	);
};
