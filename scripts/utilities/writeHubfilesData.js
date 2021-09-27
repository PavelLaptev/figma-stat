import fs from 'fs-extra';

const directories = {
  main: 'data',
  hub_files: 'hub_files',
  counters: 'counters',
};

export async function writeHubfilesData(data) {
  const date = new Date().toISOString().slice(0, 10);

  await data.forEach((file) => {
    const directory = `${directories.main}/${directories.hub_files}/${file.info.id}`;
    const infoFile = `${directory}/info.json`;
    const dateFile = `${directory}/${directories.counters}/${date}.json`;
    const currentDateFile = `${directory}/${directories.counters}/current.json`;

    fs.outputFile(infoFile, JSON.stringify(file.info), 'utf8');
    fs.outputFile(dateFile, JSON.stringify(file.counters), 'utf8');
    fs.outputFile(currentDateFile, JSON.stringify(file.counters), 'utf8');
  });
}
