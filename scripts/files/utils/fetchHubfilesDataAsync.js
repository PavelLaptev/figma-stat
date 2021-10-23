import fse from 'fs-extra';
import { parseRawHubfilesData } from './parseRawHubfilesData.js';
import { writeHubfilesData } from './writeHubfilesData.js';
import { fetchAsync } from '../../utils/fetchAsync.js';

export async function fetchHubfilesDataAsync() {
  let url =
    'https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=25';

  let totalCounts = {
    files: 0,
    duplicateCount: 0,
    likeCount: 0,
    viewCount: 0,
    commentCount: 0,
  };

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    const result = parseRawHubfilesData(json.meta.hub_files);
    url = json.pagination.next_page;
    writeHubfilesData(result);

    totalCounts = {
      files: totalCounts.files + result.length,
      duplicateCount:
        totalCounts.duplicateCount +
        result
          .map((file) => file.counters.duplicateCount)
          .reduce((a, b) => a + b),
      likeCount:
        totalCounts.likeCount +
        result.map((file) => file.counters.likeCount).reduce((a, b) => a + b),
      viewCount:
        totalCounts.viewCount +
        result.map((file) => file.counters.viewCount).reduce((a, b) => a + b),
      commentCount:
        totalCounts.commentCount +
        result
          .map((file) => file.counters.commentCount)
          .reduce((a, b) => a + b),
    };

    // console.log(totalCounts);
  }

  console.log('done', totalCounts);
  fse.outputJsonSync(`data/hub_files/total.json`, totalCounts);
}

// export async function fetchHubfilesDataAsync() {
//   let url =
//     'https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=9';

//   const response = await fetchAsync(url);
//   const json = await response.json();

//   let result = parseRawHubfilesData(json.meta.hub_files);

//   writeHubfilesData(result);
// }
