import { writePluginData } from './writePluginData.js';
import { parseRawPluginsData } from './parseRawPluginsData.js';
import { fetchAsync } from './fetchAsync.js';

export async function fetchPluginsDataAsync() {
  let result = [];
  let url =
    'https://www.figma.com/api/plugins/browse?sort_by=popular&sort_order=desc&resource_type=plugins&page_size=25';
  let count = 1;

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    result = result.concat(parseRawPluginsData(json.meta.plugins));
    url = json.pagination.next_page;
    console.log(count++, url);
    writePluginData(result);
  }

  // const response = await fetchAsync(url);
  // const json = await response.json();

  // result = parseRawPluginsData(json.meta.plugins);

  // console.log(json.meta.plugins);
  // console.log(result);
}
