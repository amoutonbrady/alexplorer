export const validateZipExtension = (file: File) => {
	return file.type === "application/x-zip-compressed";
};
