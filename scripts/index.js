import { writeData } from './utilities/writeData.js';
import { fetchPluginsDataAsync } from './utilities/fetchPluginsDataAsync.js';

const parsedPluginData = await fetchPluginsDataAsync();
await writeData(parsedPluginData);
