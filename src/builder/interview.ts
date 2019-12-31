import * as fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface InterviewType {
    folderName: string;
    folderPath: string;
    interviewTitle: string;
    authors: string[];
}

interface Manifest {
    title: string;
    authors: string[];
}

export function readInterviewTypes(contentDirectory: string): InterviewType[] {
    const folders = fs.readdirSync(contentDirectory);
    const interviewTypes = folders
        .map((folder: string) => {
            const folderPath = path.join(contentDirectory, folder);
            const dirStat = fs.statSync(folderPath);

            if (dirStat.isDirectory()) {
                console.log("Reading directory: ", folder);
                const manifestPath = path.join(folderPath, "manifest.yaml");

                if (fs.existsSync(manifestPath)) {
                    const manifest = readManifest(manifestPath);

                    return {
                        folderName: folder,
                        folderPath,
                        interviewTitle: manifest.title,
                        authors: manifest.authors
                    } as InterviewType;
                }
            }
        })
        .filter(element => !!element);

    return interviewTypes as InterviewType[];
}

function readManifest(dir: string): Manifest {
    const content = Buffer.from(fs.readFileSync(dir)).toString();
    return yaml.parse(content) as Manifest;
}
