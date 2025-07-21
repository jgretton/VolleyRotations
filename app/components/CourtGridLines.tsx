const positions = [4, 3, 2, 5, 6, 1];
export default function CourtGridLines() {
	return (
		<div className="size-full grid grid-rows-2 grid-cols-3 relative">
			{positions.map((item) => (
				<div
					key={item}
					className="w-full h-full border border-dashed border-white flex items-center justify-center hover:bg-white/10"
				>
					<p className="text-white text-2xl pointer-events-none">{item}</p>
				</div>
			))}
		</div>
	);
}
