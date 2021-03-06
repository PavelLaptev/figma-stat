import fse from 'fs-extra';
import { fetchAsync } from '../utils/fetchAsync.js';

export async function writeHubfilesData(data) {
  await data.forEach(async (file) => {
    const fileUrl = `https://pavellaptev.github.io/figma-stat/hub_files/${file.info.id}/counters.json`;

    const directory = `data/hub_files/${file.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/counters.json`;
    const currentDateDir = `${directory}/latest.json`;

    await fetchAsync(fileUrl).then(async (data) => {
      try {
        const oldJSON = await data.json();
        const newJSON = oldJSON.concat(file.counters);

        fse.outputJsonSync(infoDir, file.info);
        fse.outputJsonSync(dateDir, newJSON);
        fse.outputJsonSync(currentDateDir, file.counters);
      } catch (err) {
        console.log(`create new folder for ${file.info.id}`);

        fse.outputJsonSync(infoDir, file.info);
        fse.outputJsonSync(dateDir, [file.counters]);
        fse.outputJsonSync(currentDateDir, file.counters);
      }
    });
  });
}
