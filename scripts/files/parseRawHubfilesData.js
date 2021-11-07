export function parseRawHubfilesData(data) {
  const hubfiles = data.map((file) => {
    const metaData = Object.values(file.versions)[0];
    const date = new Date().toISOString().slice(0, 10);

    return {
      info: {
        id: file.id,
        name: metaData.name,
        lastUpdateDate: metaData.created_at,
        publisherHandle: file.publisher.profile_handle,
        publisherImage: file.publisher.img_url,
        publisherId: file.publisher.id,
        publisherName: file.publisher.name,
        thumbnailUrl: file.redirect_thumbnail_url,
        description: metaData.description,
        url: `https://www.figma.com/community/file/${file.id}`,
      },
      counters: {
        date: date,
        duplicateCount: file.duplicate_count,
        likeCount: file.like_count,
        viewCount: file.view_count,
        commentCount: file.comment_count,
        version: metaData.version,
      },
    };
  });

  return hubfiles;
}
