import fse from 'fs-extra';

const directories = {
  main: 'data',
  plugins: 'plugins',
  counters: 'counters',
};

export async function writePluginData(data) {
  const date = new Date().toISOString().slice(0, 10);

  await data.forEach((plugin) => {
    const directory = `${directories.main}/${directories.plugins}/${plugin.info.id}`;
    const infoDir = `${directory}/info.json`;
    const dateDir = `${directory}/${directories.counters}/${date}.json`;
    const currentDateDir = `${directory}/${directories.counters}/latest.json`;

    fse.outputJsonSync(infoDir, plugin.info);
    fse.outputJsonSync(dateDir, plugin.counters);
    fse.outputJsonSync(currentDateDir, plugin.counters);
  });
}
