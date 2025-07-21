import fs from "fs";
import path from "path";
import matter from "gray-matter";
import YAML from "yaml";
import { GuideContent } from "@/types";

const contentDirectory = path.join(process.cwd(), "content");

type Category = {
	slug?: string;
	data: object;
	content: object;
};
type ReturnData = {
	categories: string[];
	content: {
		[categoryName: string]: {
			slug: string;
			title: string;
			description: string;
		}[];
	};
};

export const getAllContent = (): ReturnData | null => {
	if (!fs.existsSync(contentDirectory)) {
		console.warn(`Directory ${contentDirectory} does not exist`);
		return null;
	}

	const allFileContent = fs.readdirSync(contentDirectory);
	const returnData: ReturnData = {
		categories: allFileContent,
		content: {},
	};
	allFileContent.forEach((category) => {
		const categoryPath = path.join(contentDirectory, category);
		const fileNames = fs.readdirSync(categoryPath);

		const fileData = fileNames
			.filter((fileName: string) => fileName.endsWith("yaml"))
			.map((fileName: string) => {
				const slug = fileName.replace(/\.(yaml)$/, "");
				const fullFilePath = path.join(categoryPath, fileName);
				const fileContents = fs.readFileSync(fullFilePath, "utf-8");
				const { data } = matter(fileContents);

				const { title, description } = data;

				return {
					slug,
					title,
					description,
				};
			});

		returnData.content[category] = fileData;
	});

	return returnData;
};

export const getContentByCategory = (category: string): Category[] | null => {
	if (!category) return null;
	const guidePath = path.join(contentDirectory, category);

	if (!fs.existsSync(guidePath)) {
		console.warn(`Directory ${guidePath} does not exist`);
		return null;
	}

	const fileNames = fs.readdirSync(guidePath);

	return fileNames
		.filter((fileName: string) => fileName.endsWith("yaml"))
		.map((fileName: string) => {
			const slug = fileName.replace(/\.(yaml)$/, "");
			const fullFilePath = path.join(guidePath, fileName);
			const fileContents = fs.readFileSync(fullFilePath, "utf-8");
			const { data, content } = matter(fileContents);
			const YAMLfile = YAML.parse(content);

			return {
				slug,
				content: YAMLfile,
				...data,
			} as Category;
		});
};

export const getGuideContent = (
	guide: string,
	category: string
): GuideContent | null => {
	const categoryPath = path.join(contentDirectory, category);

	if (!fs.existsSync(categoryPath)) {
		console.warn(`Directory ${categoryPath} does not exist`);
		return null;
	}

	const fileName = `${guide}.yaml`;
	const guidePath = path.join(categoryPath, fileName);

	const guideFile = fs.readFileSync(guidePath, "utf-8");
	const { data, content } = matter(guideFile);
	const YAMLfile = YAML.parse(content);

	return {
		content: YAMLfile,
		...data,
	} as GuideContent;
};
