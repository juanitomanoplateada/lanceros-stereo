export default function handler(req, res) {
  const config = {
    streamUrl: process.env.STREAM_URL || "http://link.zeno.fm:80/jz1bfxan45kuv",
    metadataUrl:
      process.env.METADATA_URL ||
      "https://api.zeno.fm/mounts/metadata/subscribe/jz1bfxan45kuv",
  };

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(config);
}
