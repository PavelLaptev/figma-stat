import fse from 'fs-extra';
import { fetchAsync } from '../utils/fetchAsync.js';

export async function fetchPluginsDataAsync() {
  const arrayLength = 75;
  const trimArrayLength = 50;
  let url = `https://www.figma.com/api/hub_files/all?sort_by=created_at&sort_order=desc&pagination_direction=next&page_size=${arrayLength}`;

  let totalAmount = {
    files: 0,
    duplicates: 0,
    likes: 0,
    views: 0,
    comments: 0,
  };

  let topSorted = Array(arrayLength).fill({
    id: '',
    name: '',
    publisherName: '',
    publisherID: '',
    publisherIcon: '',
    duplicates: 0,
    likes: 0,
    views: 0,
    comments: 0,
    followers: 0,
  });

  while (typeof url !== 'undefined') {
    const response = await fetchAsync(url);
    const json = await response.json();

    let result = json.meta.hub_files;
    url = json.pagination.next_page;

    //////////////////////////////////////
    //////// Write common data ///////////
    //////////////////////////////////////
    totalAmount = {
      files: totalAmount.files + result.length,
      duplicates:
        totalAmount.duplicates +
        result.reduce((acc, cur) => acc + cur.duplicate_count, 0),
      likes:
        totalAmount.likes +
        result.reduce((acc, cur) => acc + cur.like_count, 0),
      views:
        totalAmount.views +
        result.reduce((acc, cur) => acc + cur.view_count, 0),
      comments:
        totalAmount.comments +
        result.reduce((acc, cur) => acc + cur.comment_count, 0),
    };

    //////////////////////////////////////
    /////////// Compare likes ////////////
    //////////////////////////////////////
    const topCurrent = result.map((a) => {
      return {
        id: a.id,
        name: Object.values(a.versions)[0].name,
        icon: `https://www.figma.com/community/plugin/${a.id}/icon`,
        publisherName: a.publisher.name,
        publisherID: a.publisher.id,
        publisherIcon: a.publisher.img_url,
        duplicates: a.duplicate_count,
        likes: a.like_count,
        comments: a.comment_count,
        views: a.view_count,
        followers: a.publisher.follower_count,
      };
    });

    topSorted = topSorted.concat(topCurrent);

    //////////////////////////////////////
    //////////////////////////////////////
    //////////////////////////////////////
    console.log(topSorted.length);
  }

  const topData = {
    totalAmount: totalAmount,
    topDuplicates: topSorted
      .sort((a, b) => b.duplicates - a.duplicates)
      .slice(0, trimArrayLength)
      .map((a) => {
        return {
          id: a.id,
          name: a.name,
          icon: a.icon,
          duplicates: a.duplicates,
          publisherID: a.publisherID,
          publisherName: a.publisherName,
        };
      }),
    topLikes: topSorted
      .sort((a, b) => b.likes - a.likes)
      .slice(0, trimArrayLength)
      .map((a) => {
        return {
          id: a.id,
          name: a.name,
          icon: a.icon,
          likes: a.likes,
          publisherID: a.publisherID,
          publisherName: a.publisherName,
        };
      }),
    topViews: topSorted
      .sort((a, b) => b.views - a.views)
      .slice(0, trimArrayLength)
      .map((a) => {
        return {
          id: a.id,
          name: a.name,
          icon: a.icon,
          views: a.views,
          publisherID: a.publisherID,
          publisherName: a.publisherName,
        };
      }),
    topComments: topSorted
      .sort((a, b) => b.comments - a.comments)
      .slice(0, trimArrayLength)
      .map((a) => {
        return {
          id: a.id,
          name: a.name,
          icon: a.icon,
          comments: a.comments,
          publisherID: a.publisherID,
          publisherName: a.publisherName,
        };
      }),
    topPopularUsers: topSorted
      .filter(
        (v, i, a) => a.findIndex((t) => t.publisherID === v.publisherID) === i
      )
      .sort((a, b) => b.followers - a.followers)
      .slice(0, trimArrayLength)
      .map((a) => {
        return {
          id: a.publisherID,
          name: a.publisherName,
          publisherIcon: a.publisherIcon,
          followers: a.followers,
        };
      }),
  };

  fse.outputJsonSync(`data/hub_files/common.json`, topData);
  console.log(topData);
}

fetchPluginsDataAsync();
