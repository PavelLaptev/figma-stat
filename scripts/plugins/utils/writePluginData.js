import fse from 'fs-extra';

import { fetchAsync } from '../../utils/fetchAsync.js';

export async function writePluginData(data) {
  // const date = new Date().toISOString().slice(0, 10);

  await data.forEach(async (plugin) => {
    const pluginUrl = `https://pavellaptev.github.io/figma-stat/plugins/${plugin.info.id}/counters.json`;

    const directory = `data/plugins/${plugin.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/counters.json`;
    const currentDateDir = `${directory}/latest.json`;

    await fetchAsync(pluginUrl).then(async (data) => {
      try {
        const oldJSON = await data.json();
        const newJSON = oldJSON.concat(plugin.counters);

        fse.outputJsonSync(infoDir, plugin.info);
        fse.outputJsonSync(dateDir, newJSON);
        fse.outputJsonSync(currentDateDir, plugin.counters);
      } catch (err) {
        console.error(err);
        console.log('CREATE NEW FOLDER');

        fse.outputJsonSync(infoDir, plugin.info);
        fse.outputJsonSync(dateDir, [plugin.counters]);
        fse.outputJsonSync(currentDateDir, plugin.counters);
      }
    });
  });
}
