import fse from 'fs-extra';

import { fetchAsync } from '../../utils/fetchAsync.js';

export async function writePluginData(data) {
  // const date = new Date().toISOString().slice(0, 10);

  await data.forEach(async (plugin) => {
    const pluginUrl = `https://raw.githubusercontent.com/PavelLaptev/figma-stat/empty-branch/plugins/${plugin.info.id}/counters.json`;

    await fetchAsync(pluginUrl).then((data) => {
      if (data.status === 404) {
        const directory = `data/plugins/${plugin.info.id}`;
        const infoDir = `${directory}/info.json`;
        const dateDir = `${directory}/counters.json`;
        const currentDateDir = `${directory}/latest.json`;

        fse.outputJsonSync(infoDir, plugin.info);
        fse.outputJsonSync(dateDir, [plugin.counters]);
        fse.outputJsonSync(currentDateDir, plugin.counters);
      }
    });
  });
}
