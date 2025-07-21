export default function PageHeader({
	title,
	children,
	subtitle,
}: {
	title: string;
	children?: React.ReactNode;
	subtitle?: string;
}) {
	return (
		<>
			<p className="text-center">{subtitle}</p>
			<h1 className="text-center text-[min(10vw,5rem)] font-light">{title}</h1>
			<p className="text-center mt-10 text-balance  mx-auto text-xl font-light leading-relaxed">
				{children}
			</p>
		</>
	);
}
