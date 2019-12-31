import * as fs from 'fs-extra';
import path from 'path';
import { InterviewType, readInterviewTypes } from "./interview";
import { Section, readSections } from "./section";

const outDir = "out";
const contentDir = "src/content";
const staticDir = "static";

interface Interview {
    id: string;
    title: string;
    sections: SectionOut[];
}

interface SectionOut {
    title: string;
    order: number;
    contents: string[];
}

function build() {
    const interviewTypes = readInterviewTypes(contentDir);

    console.log(" [*] Preparing out directory...");
    prepareDirectory(outDir);

    console.log(" [*] Copying static files...");
    fs.copySync(staticDir, outDir);

    console.log (" [*] Compiling markdowns...");

    let interviews: Interview[] = [];
    interviewTypes.forEach((interviewType: InterviewType) => {
        const interviewUid = interviewType.folderName;
        const sections = readSections(interviewType.folderPath);

        let sectionsOut = sections.map((section: Section) => {
            console.log (` [*] Writing section '${section.title}' file...`);
            const contentPaths = writeSectionContentFiles(interviewUid, section);
            return {
                title: section.title,
                order: section.order,
                contents: contentPaths
            }
        });

        interviews.push({
            id: interviewUid,
            title: interviewType.interviewTitle,
            sections: sectionsOut
        });
    });

    console.log (" [*] Writing root interviews.json file...");
    writeInterviewsJsonFile(interviews);
}

function prepareDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function writeSectionContentFiles(interviewUid: string, section: Section): string[] {
    let contentPaths: string[] = [];
    const sectionUid = section.order.toString();

    section.content.forEach((content, i) => {
        const dirPath = path.join("markdowns", interviewUid, sectionUid);
        const filePath = path.join(dirPath, `${i}.md`);
        const fullPath = path.join(outDir, filePath);

        prepareDirectory(path.join(outDir, dirPath));

        fs.writeFileSync(fullPath, content);
        contentPaths.push(`/${filePath}`);
    });

    return contentPaths;
}

function writeInterviewsJsonFile(interviews: Interview[]) {
    const filePath = path.join(outDir, "interviews.json");
    fs.writeFileSync(filePath, JSON.stringify(interviews));
}

build();
