export default function handler(req, res) {
  const config = {
    streamUrl: process.env.STREAM_URL || "https://stream-178.zeno.fm/jz1bfxan45kuv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJqejFiZnhhbjQ1a3V2IiwiaG9zdCI6InN0cmVhbS0xNzguemVuby5mbSIsInRtIjpmYWxzZSwicnR0bCI6NSwianRpIjoiaXExcG1zdEZUbEtvQXo0R2ZPaG5MZyIsImlhdCI6MTc1ODY0NDIxMiwiZXhwIjoxNzU4NjQ0MjcyfQ.edIDbQdW5ZgPGtOe2REF1Y9ZoUa8bej2TLClbESQYG4",
    metadataUrl:
      process.env.METADATA_URL ||
      "https://api.zeno.fm/mounts/metadata/subscribe/jz1bfxan45kuv",
  };

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(config);
}
