import { writeWidgetsData } from './writeWidgetsData.js';
import { parseRawWidgetsData } from './parseRawWidgetsData.js';
import { fetchAsync } from '../utils/fetchAsync.js';

export async function fetchPluginsDataAsync() {
  let url =
    'https://www.figma.com/api/widgets/browse?sort_by=popular&sort_order=desc&resource_type=&page_size=25';

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    let result = parseRawWidgetsData(json.meta.widgets);
    url = json.pagination.next_page;

    writeWidgetsData(result);
  }
}

fetchPluginsDataAsync();
