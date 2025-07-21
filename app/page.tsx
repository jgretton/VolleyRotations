import { getAllContent } from "@/lib/content";
import PageHeader from "./components/PageHeader";
import { g, li } from "motion/react-client";
import Link from "next/link";

export default function Home() {
	const allContent = getAllContent();

	return (
		<main className="min-h-screen max-w-7xl mx-auto px-4 ">
			<section className="mt-20">
				<PageHeader title={"VolleyRotations"}>
					 VolleyRotations is your go-to resource for understanding the
					fundamentals of volleyball court positions. Whether you’re a beginner
					looking to grasp the basics or an intermediate player aiming to refine
					your skills, our site is designed to help you navigate the intricacies
					of the game.{" "}
				</PageHeader>
			</section>

			<section className="grid grid-cols-1 gap-10 mt-20">
				{allContent ? (
					allContent.categories.map((category) => {
						console.log(category);
						return (
							<div className="" key={category}>
								<h2 className="rounded-full py-3 px-6 text-lg/6 font-semibold text-black focus:outline-none bg-black/10 inline-block ">
									{category}
								</h2>
								<ul className="flex flex-col md:flex-row p-3 gap-5">
									{allContent.content[category].map((content) => {
										return (
											<li
												key={content.slug}
												className="relative rounded-md p-3 md:w-1/3 w-full text-sm/6 transition hover:bg-black/5 "
											>
												<Link
													href={`/${category}/${content.slug}`}
													className="font-semibold text-black"
												>
													<div className="h-60 w-full bg-red-100 rounded-md mb-2"></div>
													{content.title}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})
				) : (
					<div>No guide exists</div>
				)}
			</section>
		</main>
	);
}
