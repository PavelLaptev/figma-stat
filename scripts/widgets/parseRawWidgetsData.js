export function parseRawWidgetsData(data) {
  const widgets = data.map((widget) => {
    const metaData = Object.values(widget.versions)[0];
    const date = new Date().toISOString().slice(0, 10);

    return {
      info: {
        id: widget.id,
        name: metaData.name,
        lastUpdateDate: metaData.created_at,
        publisherHandle: widget.publisher.profile_handle,
        publisherImage: widget.publisher.img_url,
        publisherId: widget.publisher.id,
        publisherName: widget.publisher.name,
        description: metaData.description,
        url: `https://www.figma.com/community/widget/${widget.id}`,
        iconUrl: `https://www.figma.com/community/widget/${widget.id}/icon`,
        thumbnailUrl: `https://www.figma.com/community/widget/${widget.id}/thumbnail`,
      },
      counters: {
        date: date,
        installCount: widget.install_count,
        likeCount: widget.like_count,
        viewCount: widget.view_count,
        commentCount: widget.comment_count,
        version: metaData.version,
      },
    };
  });

  return widgets;
}
