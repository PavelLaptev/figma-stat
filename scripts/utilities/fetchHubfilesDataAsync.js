import { parseRawHubfilesData } from './parseRawHubfilesData.js';
import { writeHubfilesData } from './writeHubfilesData.js';
import { fetchAsync } from './fetchAsync.js';

export async function fetchHubfilesDataAsync(endYear) {
  let endYearString = `cursor=${endYear}`;
  let result = [];
  let url =
    'https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=25';
  let count = 1;

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    if (json.pagination.next_page.includes(endYearString)) {
      result = result.concat(parseRawHubfilesData(json.meta.hub_files));
      url = json.pagination.next_page;
      console.log(count++, url);
      writeHubfilesData(result);
    } else {
      return;
    }
  }
}
