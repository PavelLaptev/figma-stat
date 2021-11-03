import { parseRawHubfilesData } from './parseRawHubfilesData.js';
import { writeHubfilesData } from './writeHubfilesData.js';
import { fetchAsync } from '../../utils/fetchAsync.js';

export async function fetchHubfilesDataAsync() {
  let url =
    'https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=25';

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    const result = parseRawHubfilesData(json.meta.hub_files);
    url = json.pagination.next_page;
    writeHubfilesData(result);
  }
}

////////////////////////////////////////////////////////////////////////////////

// export async function fetchHubfilesDataAsync() {
//   let url =
//     'https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=9';

//   const response = await fetchAsync(url);
//   const json = await response.json();

//   let result = parseRawHubfilesData(json.meta.hub_files);

//   writeHubfilesData(result);
// }

////////////////////////////////////////////////////////////////////////////////
