import { writeData } from './utilities/writeData.js';
import { fetchPluginsDataAsync } from './utilities/fetchPluginsDataAsync.js';

// console.log(parseRawPluginsData(await fetchRawPluginsDataAsync()));
const parsedPluginData = await fetchPluginsDataAsync();
await writeData(parsedPluginData);
// console.log(parsedPluginData);
