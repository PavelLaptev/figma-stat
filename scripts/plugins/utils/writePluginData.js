import fse from 'fs-extra';
import fetch from 'node-fetch';

import { fetchAsync } from '../../utils/fetchAsync.js';

export async function writePluginData(data) {
  // const date = new Date().toISOString().slice(0, 10);

  await data.forEach((plugin) => {
    const pluginUrl = `https://raw.githubusercontent.com/PavelLaptev/figma-stat/gh-pages/${plugin.info.id}/counters.json`;
    fetch(pluginUrl).then((response) => {
      if (response.status === 404) {
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
