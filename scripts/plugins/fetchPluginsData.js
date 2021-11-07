import { writePluginData } from './writePluginData.js';
import { parseRawPluginsData } from './parseRawPluginsData.js';
import { fetchAsync } from '../utils/fetchAsync.js';

export async function fetchPluginsDataAsync() {
  let url =
    'https://www.figma.com/api/plugins/browse?sort_by=popular&sort_order=desc&resource_type=plugins&page_size=25';

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    let result = parseRawPluginsData(json.meta.plugins);
    url = json.pagination.next_page;

    writePluginData(result);
  }
}

fetchPluginsDataAsync();
