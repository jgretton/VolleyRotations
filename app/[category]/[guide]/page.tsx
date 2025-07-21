import PageHeader from "@/app/components/PageHeader";
import { getGuideContent } from "@/lib/content";
import { GuideContent } from "@/types";
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

	console.log(guideContent);

	return (
		<main className="min-h-screen max-w-7xl mx-auto px-4 ">
			<section className="mt-20">
				<PageHeader title={guideContent.title} subtitle={category}>
					{guideContent.description}
				</PageHeader>
			</section>
		</main>
	);
}
