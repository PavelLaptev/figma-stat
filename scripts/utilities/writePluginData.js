import fse from 'fs-extra';

const directories = {
  main: 'data',
  plugins: 'plugins',
  counters: 'counters',
};

export async function writePluginData(data) {
  await data.forEach((plugin) => {
    const directory = `${directories.main}/${directories.plugins}/${plugin.info.id}`;
    const infoDir = `${directory}/info.json`;
    const countersDir = `${directory}/counters.json`;
    const currentcountersDir = `${directory}/latest.json`;

    fse.readFile(countersDir, (err, data) => {
      if (err) {
        fse.outputJsonSync(countersDir, [plugin.counters]);
      } else {
        const currentJSON = JSON.parse(data);
        const newJSON = [...currentJSON, plugin.counters];
        fse.outputJsonSync(countersDir, newJSON);
      }
    });

    fse.outputJsonSync(infoDir, plugin.info);
    fse.outputJsonSync(currentcountersDir, plugin.counters);
  });
}
