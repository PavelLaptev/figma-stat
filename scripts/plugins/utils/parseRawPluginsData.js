export function parseRawPluginsData(data) {
  const plugins = data.map((plugin) => {
    const metaData = Object.values(plugin.versions)[0];
    const date = new Date().toISOString().slice(0, 10);

    return {
      info: {
        id: plugin.id,
        name: metaData.name,
        lastUpdateDate: metaData.created_at,
        publisherHandle: plugin.publisher.profile_handle,
        publisherImage: plugin.publisher.img_url,
        publisherId: plugin.publisher.id,
        publisherName: plugin.publisher.name,
        iconUrl: `https://www.figma.com/community/plugin/${plugin.id}/icon`,
        thumbnailUrl: `https://www.figma.com/community/plugin/${plugin.id}/thumbnail`,
      },
      counters: {
        date: date,
        installCount: plugin.install_count,
        likeCount: plugin.like_count,
        viewCount: plugin.view_count,
        commentCount: plugin.comment_count,
        version: metaData.version,
      },
    };
  });

  return plugins;
}
