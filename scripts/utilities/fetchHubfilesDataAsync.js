import { parseRawHubfilesData } from './parseRawHubfilesData.js';
import { writeHubfilesData } from './writeHubfilesData.js';
import { fetchAsync } from './fetchAsync.js';

export async function fetchHubfilesDataAsync() {
  let result = [];
  let url =
    'https://www.figma.com/api/hub_files/all?sort_by=popular&sort_order=desc&pagination_direction=next&page_size=25';

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    if (url !== json.pagination.next_page) {
      result = result.concat(parseRawHubfilesData(json.meta.hub_files));
      url = json.pagination.next_page;
      console.log(url);
      writeHubfilesData(result);
    } else {
      return;
    }
  }

  // const response = await fetchAsync(url);
  // const json = await response.json();

  // result = parseRawHubfilesData(json.meta.hub_files);
  // writeHubfilesData(result);

  // console.log(json.meta.plugins);
  // console.log(result);
}
