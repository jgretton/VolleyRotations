import React from "react";

export default function Court({ children }: { children: React.ReactNode }) {
	return (
		<div className=" size-full aspect-square rounded-t-md p-4 relative shrink-0">
			{/* net */}
			<div className="absolute z-10 w-full h-[5%] top-0  left-0 rounded-md bg-slate-600  border-4 border-black/20" />
			{/* court */}
			<div
				className="size-full bg-amber-700 border-8 border-white border-t-0 relative"
				// ref={courtRef}
			>
				{/* 3m line */}
				<div className="absolute bg-gray-400/30 h-2 w-full top-1/3" />

				{children}
			</div>
		</div>
	);
}
