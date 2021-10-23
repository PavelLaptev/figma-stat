import fse from 'fs-extra';
import { writePluginData } from './writePluginData.js';
import { parseRawPluginsData } from './parseRawPluginsData.js';
import { fetchAsync } from '../../utils/fetchAsync.js';

export async function fetchPluginsDataAsync() {
  let url =
    'https://www.figma.com/api/plugins/browse?sort_by=popular&sort_order=desc&resource_type=plugins&page_size=25';

  let totalCounts = {
    plugins: 0,
    installCount: 0,
    likeCount: 0,
    viewCount: 0,
    commentCount: 0,
  };

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    let result = parseRawPluginsData(json.meta.plugins);
    url = json.pagination.next_page;
    writePluginData(result);

    totalCounts = {
      plugins: totalCounts.plugins + result.length,
      installCount:
        totalCounts.installCount +
        result
          .map((plugin) => plugin.counters.installCount)
          .reduce((a, b) => a + b),
      likeCount:
        totalCounts.likeCount +
        result
          .map((plugin) => plugin.counters.likeCount)
          .reduce((a, b) => a + b),
      viewCount:
        totalCounts.viewCount +
        result
          .map((plugin) => plugin.counters.viewCount)
          .reduce((a, b) => a + b),
      commentCount:
        totalCounts.commentCount +
        result
          .map((plugin) => plugin.counters.commentCount)
          .reduce((a, b) => a + b),
    };

    console.log(totalCounts);
  }

  console.log('done', totalCounts);
  fse.outputJsonSync(`data/plugins/total.json`, totalCounts);
}

// export async function fetchPluginsDataAsync() {
//   let url =
//     'https://www.figma.com/api/plugins/browse?sort_by=popular&sort_order=desc&resource_type=plugins&page_size=10';

//   const response = await fetchAsync(url);
//   const json = await response.json();

//   let result = parseRawPluginsData(json.meta.plugins);

//   writePluginData(result);
// }
