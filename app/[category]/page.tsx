import { getContentByCategory } from "@/lib/content";
import { notFound } from "next/navigation";
import PageHeader from "../components/PageHeader";
import Link from "next/link";

type PageProps = {
	params: {
		category: string;
	};
};

export default async function Page(props: PageProps) {
	const { category } = await props.params;

	const guides = getContentByCategory(category);

	if (!guides) return notFound();

	return (
		<main className="min-h-screen max-w-7xl mx-auto px-4 ">
			<section className="mt-20">
				<PageHeader title={category}></PageHeader>
			</section>
			<section className="w-full">
				<ul className="flex flex-col md:flex-row">
					{guides.map((guide) => {
						return (
							<li
								key={guide.slug}
								className="relative rounded-md p-3 md:w-1/3 w-full text-sm/6 transition hover:bg-black/5 "
							>
								<Link
									href={`/${category}/${guide.slug}`}
									className="font-semibold text-black"
								>
									<div className="h-60 w-full bg-red-100 rounded-md mb-2"></div>
									{guide.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
}
