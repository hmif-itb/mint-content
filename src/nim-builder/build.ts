import fs from 'fs';
import path from 'path';

const outDir = "out/nim";

function build() {
    const content = fs.readFileSync("./nim/nim.json").toString();
    const students: { [nim: string]: string } = JSON.parse(content);

    console.log(" [*] Building students list...");
    let i = 0;
    for (const key in students) {
        const kodeJurusan = key.substr(0, 3);
        const angkatan = key.substr(3, 2);
        const noUrut = key.substr(5, 3);

        const dirname = path.join(outDir, kodeJurusan, angkatan);
        prepareDirectory(dirname);

        fs.writeFileSync(path.join(dirname, noUrut), students[key]);
        i++;
    }

    console.log(" [*] Written " + i + " files");
}

function prepareDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

build();
