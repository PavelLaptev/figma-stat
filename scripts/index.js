import { fetchPluginsDataAsync } from './utilities/fetchPluginsDataAsync.js';

// console.log(parseRawPluginsData(await fetchRawPluginsDataAsync()));
const parsedPluginData = await fetchPluginsDataAsync();
console.log(parsedPluginData);
