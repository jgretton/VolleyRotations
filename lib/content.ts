import fs from "fs";
import path from "path";
import matter from "gray-matter";
import YAML from "yaml";

const contentDirectory = path.join(process.cwd(), "content");

type Category = {
	slug: string;
	data: object;
	content: object;
};

export const getAllContent = () => {
	if (!fs.existsSync(contentDirectory)) {
		console.warn(`Directory ${contentDirectory} does not exist`);
		return null;
	}

	const allFileContent = fs.readdirSync(contentDirectory);
	return allFileContent.map((category) => {
		return { [category]: getContentByCategory(category) };
	});
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
