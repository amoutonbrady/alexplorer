export const Link = ({ to = "/" as String, children, ...attributes }) => {
	return (
		<a {...attributes} href={`#${to}`}>
			{children}
		</a>
	);
};
