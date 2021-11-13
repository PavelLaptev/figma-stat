import fse from 'fs-extra';
import { fetchAsync } from '../utils/fetchAsync.js';

export async function writeWidgetsData(data) {
  await data.forEach(async (widget) => {
    const widgetUrl = `https://pavellaptev.github.io/figma-stat/widgets/${widget.info.id}/counters.json`;

    const directory = `data/widgets/${widget.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/counters.json`;
    const currentDateDir = `${directory}/latest.json`;

    await fetchAsync(widgetUrl).then(async (data) => {
      try {
        const oldJSON = await data.json();
        const newJSON = oldJSON.concat(widget.counters);

        fse.outputJsonSync(infoDir, widget.info);
        fse.outputJsonSync(dateDir, newJSON);
        fse.outputJsonSync(currentDateDir, widget.counters);
      } catch (err) {
        console.error(err);
        console.log(`create new folder for ${widget.info.id}`);

        fse.outputJsonSync(infoDir, widget.info);
        fse.outputJsonSync(dateDir, [widget.counters]);
        fse.outputJsonSync(currentDateDir, widget.counters);
      }
    });
  });
}
