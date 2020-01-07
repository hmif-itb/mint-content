import * as fs from 'fs';
import path from 'path';

export interface Section {
    order: number;
    title: string;
    content: string[];
}

export function readSections(sectionDirectory: string): Section[] {
    const folders = fs.readdirSync(sectionDirectory);
    const sections = folders
        .map((pathName: string) => {
            const fullPath = path.join(sectionDirectory, pathName);
            const stat = fs.statSync(fullPath);

            // console.log(pathName, stat.isFile(), pathName.toLowerCase().endsWith(".md"));
            if (stat.isFile() && pathName.toLowerCase().endsWith(".md")) {
                return parseSectionFile(fullPath);
            } else if (stat.isDirectory()) {
                return parseSectionDirectory(fullPath);
            }
        })
        .filter(element => !!element);

    return sections as Section[];
}

function parseSectionFile(filePath: string): Section|void {
    const splitName = filePath.split("/").pop()?.split("_") || "";
    const order = parseInt(splitName[0]);
    const title = splitName[1].replace(".md", "");

    if (isNaN(order)) {
        return;
    }

    if (!title) {
        return;
    }

    const content = Buffer.from(fs.readFileSync(filePath)).toString().trimLeft();

    return {
        order,
        title,
        content: [content]
    };
}

function parseSectionDirectory(dirPath: string): Section|void {
    const splitName = dirPath.split("/").pop()?.split("_") || "";
    const order = parseInt(splitName[0]);
    const title = splitName[1];

    if (isNaN(order)) {
        return;
    }

    const files = fs.readdirSync(dirPath);
    const content = files
        .map((filePath: string) => {
            if (filePath.startsWith("_blank")) {
                return "_blank";
            }

            const fullPath = path.join(dirPath, filePath);
            const raw = Buffer.from(fs.readFileSync(fullPath)).toString().trimLeft();
            if (!!raw) return raw;
        })
        .filter(element => !!element);

    return {
        order,
        title,
        content
    } as Section;
}
