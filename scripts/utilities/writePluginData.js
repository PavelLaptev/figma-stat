import fs from 'fs-extra';

const directories = {
  main: 'data',
  plugins: 'plugins',
  counters: 'counters',
};

export async function writePluginData(data) {
  const date = new Date().toISOString().slice(0, 10);

  await data.forEach((plugin) => {
    const directory = `${directories.main}/${directories.plugins}/${plugin.info.id}`;
    const infoFile = `${directory}/info.json`;
    const dateFile = `${directory}/${directories.counters}/${date}.json`;
    const currentDateFile = `${directory}/${directories.counters}/latest.json`;

    fs.outputFile(infoFile, JSON.stringify(plugin.info), 'utf8');
    fs.outputFile(dateFile, JSON.stringify(plugin.counters), 'utf8');
    fs.outputFile(currentDateFile, JSON.stringify(plugin.counters), 'utf8');
  });
}
