import fse from 'fs-extra';
import { fetchAsync } from '../../utils/fetchAsync.js';
import { findChange } from '../../utils/findChange.js';

export async function writePluginData(data) {
  await data.forEach(async (plugin) => {
    const pluginUrl = `https://pavellaptev.github.io/figma-stat/plugins/${plugin.info.id}/counters.json`;

    const directory = `data/plugins/${plugin.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/counters.json`;
    const currentDateDir = `${directory}/latest.json`;
    const changeeDir = `${directory}/change.json`;

    let changeStat = {
      installCount: '',
      likeCount: '',
      viewCount: '',
      commentCount: '',
    };

    await fetchAsync(pluginUrl).then(async (data) => {
      try {
        const oldJSON = await data.json();
        const newJSON = oldJSON.concat(plugin.counters);

        changeStat = {
          installCount: findChange(newJSON, 'installCount'),
          likeCount: findChange(newJSON, 'likeCount'),
          viewCount: findChange(newJSON, 'viewCount'),
          commentCount: findChange(newJSON, 'commentCount'),
        };

        fse.outputJsonSync(infoDir, plugin.info);
        fse.outputJsonSync(dateDir, newJSON);
        fse.outputJsonSync(currentDateDir, plugin.counters);
        fse.outputJsonSync(changeeDir, changeStat);
      } catch (err) {
        console.error(err);
        console.log(`create new folder for ${plugin.info.id}`);

        fse.outputJsonSync(infoDir, plugin.info);
        fse.outputJsonSync(dateDir, [plugin.counters]);
        fse.outputJsonSync(currentDateDir, plugin.counters);
        fse.outputJsonSync(changeeDir, changeStat);
      }
    });
  });
}
