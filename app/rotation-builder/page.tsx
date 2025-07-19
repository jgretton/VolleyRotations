"use client";

import { useRef, useState } from "react";
import { motion, PanInfo } from "motion/react";
type BasePositions = {
	[position: string]: {
		x: number;
		y: number;
	};
};
// const BASE_POSITIONS: BasePositions = {
// 	MB: { x: 61, y: 94 },
// 	OH1: { x: 215, y: 94 },
// 	S: { x: 370, y: 94 },
// 	OP: { x: 61, y: 330 },
// 	OH2: { x: 215, y: 330 },
// 	L: { x: 370, y: 330 },
// };

const BASE_POSITIONS: BasePositions = {
	MB: { x: 14.37, y: 19.58 },
	OH1: { x: 46.46, y: 19.58 },
	S: { x: 78.75, y: 19.58 },
	OP: { x: 14.37, y: 68.75 },
	OH2: { x: 46.46, y: 68.75 },
	L: { x: 78.75, y: 68.75 },
};

export default function Page() {
	const elem = useRef<(HTMLDivElement | null)[]>([]);
	const courtRef = useRef<HTMLDivElement | null>(null);

	const [playerPositions, setPlayerPositions] =
		useState<BasePositions>(BASE_POSITIONS);

	const [draggingPlayer, setDraggingPlayer] = useState<string | null>(null);

	// Add back the mouse down handler
	const handleMouseDown = (e: React.MouseEvent) => {
		setDraggingPlayer(e.currentTarget.id);
	};

	const handleDragEnd = (
		e: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if (!draggingPlayer) return; // Safety check

		const courtDimensions = courtRef.current?.getBoundingClientRect();
		const offsetXPercent = (info.offset.x / courtDimensions.width) * 100;
		const offsetYPercent = (info.offset.y / courtDimensions.height) * 100;

		setPlayerPositions((prevState) => {
			return {
				...prevState,
				[draggingPlayer]: {
					x: Number((prevState[draggingPlayer].x + offsetXPercent).toFixed(2)),
					y: Number((prevState[draggingPlayer].y + offsetYPercent).toFixed(2)),
				},
			};
		});
		setDraggingPlayer(null);
	};
	return (
		<main className="min-h-screen max-w-7xl mx-auto px-4 ">
			<section className="pt-20">
				<h1 className="text-center text-[min(10vw,5rem)] font-light">
					Rotation Builder
				</h1>
			</section>

			<section className="mt-10 flex flex-row">
				{/* outer court */}
				<div className="max-w-lg w-full aspect-square bg-amber-900/30 rounded-t-md mx-auto p-4 relative">
					{/* net */}
					<div className="absolute z-10 w-full h-6 top-0 bg-gray-300 left-0 rounded-md" />
					{/* court */}
					<div
						className="size-full bg-red-100 border-8 border-white border-t-0 relative"
						ref={courtRef}
					>
						{/* 3m line */}
						<div className="absolute bg-gray-900/10 h-2 w-full top-1/3" />

						{/* player positions */}
						{Object.keys(playerPositions).map((position, index) => {
							const x = `${playerPositions[position].x}%`;
							const y = `${playerPositions[position].y}%`;
							return (
								<motion.div
									key={position}
									ref={(ref) => {
										elem.current[index] = ref;
									}}
									id={position}
									className="rounded-full border size-12 bg-blue-200 grid place-items-center absolute cursor-grab"
									drag
									dragConstraints={courtRef}
									whileTap={{ scale: 1.2, cursor: "grabbing" }}
									dragMomentum={false}
									onMouseDown={handleMouseDown}
									onDragEnd={handleDragEnd}
									initial={{ top: y, left: x }}
								>
									{position}
								</motion.div>
							);
						})}
					</div>
				</div>

				<div className="">
					{Object.keys(playerPositions).map((position) => (
						<p key={position}>
							{position} : (x:{playerPositions[position].x}, y:
							{playerPositions[position].y})
						</p>
					))}
				</div>
			</section>
		</main>
	);
}
