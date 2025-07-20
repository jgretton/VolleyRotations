import PageHeader from "@/app/components/PageHeader";

type PageProps = {
	params: {
		guide: string;
	};
};

export default async function Page(props: PageProps) {
	const { guide } = await props.params;

	return (
		<main className="min-h-screen max-w-7xl mx-auto px-4 ">
			<section className="mt-20">
				<PageHeader title={guide}></PageHeader>
			</section>
		</main>
	);
}
