import Court from "@/app/components/Court";
import PageHeader from "@/app/components/PageHeader";
import { getGuideContent } from "@/lib/content";
import { notFound } from "next/navigation";

type PageProps = {
	params: {
		guide: string;
		category: string;
	};
};

export default async function Page(props: PageProps) {
	const { guide, category } = await props.params;
	console.log(category, guide);

	const guideContent = getGuideContent(guide, category);
	if (!guideContent) return notFound();

	console.log(guideContent.content);

	return (
		<main className="min-h-screen ">
			<section className="mt-20 max-w-7xl mx-auto px-4 ">
				<PageHeader title={guideContent.title} subtitle={category}>
					{guideContent.description}
				</PageHeader>
			</section>

			<section className="bg-green-800/70 p-10">
				<div className="max-w-lg">
					<Court></Court>
				</div>
			</section>
		</main>
	);
}
