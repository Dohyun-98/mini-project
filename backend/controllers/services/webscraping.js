import cheerio from "cheerio";
import axios from "axios";

export async function getOgTag(url) {
  if (url.match("http://" || "https://") === null) {
    url = "http://" + url;
  }
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  let title;
  let description;
  let image;

  $("meta").each((i, el) => {
    if ($(el).attr("property")?.includes("og:title")) {
      title = $(el).attr("content");
    }
    if ($(el).attr("property")?.includes("og:description")) {
      description = $(el).attr("content");
    }
    if ($(el).attr("property")?.includes("og:image")) {
      image = $(el).attr("content");
    }
  });
  return {
    title,
    description,
    image,
  };
}
