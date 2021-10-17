import fse from 'fs-extra';
import { fetchAsync } from '../../utils/fetchAsync.js';
import { findChange } from '../../utils/findChange.js';

export async function writeHubfilesData(data) {
  await data.forEach(async (file) => {
    const fileUrl = `https://pavellaptev.github.io/figma-stat/hub_files/${file.info.id}/counters.json`;

    const directory = `data/hub_files/${file.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/counters.json`;
    const currentDateDir = `${directory}/latest.json`;
    const changeeDir = `${directory}/change.json`;

    let changeStat = {
      duplicateCount: '',
      likeCount: '',
      viewCount: '',
      commentCount: '',
    };

    await fetchAsync(fileUrl).then(async (data) => {
      try {
        const oldJSON = await data.json();
        const newJSON = oldJSON.concat(file.counters);

        changeStat = {
          duplicateCount: findChange(newJSON, 'installCount'),
          likeCount: findChange(newJSON, 'likeCount'),
          viewCount: findChange(newJSON, 'viewCount'),
          commentCount: findChange(newJSON, 'commentCount'),
        };

        fse.outputJsonSync(infoDir, file.info);
        fse.outputJsonSync(dateDir, newJSON);
        fse.outputJsonSync(currentDateDir, file.counters);
        fse.outputJsonSync(changeeDir, changeStat);
      } catch (err) {
        console.error(err);
        console.log('CREATE NEW FOLDER');

        fse.outputJsonSync(infoDir, file.info);
        fse.outputJsonSync(dateDir, [file.counters]);
        fse.outputJsonSync(currentDateDir, file.counters);
        fse.outputJsonSync(changeeDir, changeStat);
      }
    });
  });
}
