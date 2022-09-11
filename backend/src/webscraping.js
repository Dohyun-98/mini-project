import cheerio from "cheerio";
import axios from "axios";

export async function getOgTag(url) {
  if (url.match("http://" || "https://") === null) {
    url = "http://" + url;
  }
  console.log(url);
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  let value = [];

  $("meta").each((i, el) => {
    if ($(el).attr("property")?.includes("og:")) {
      value.push($(el).attr("content"));
    }
  });
  return {
    title: value[0],
    description: value[3],
    image: value[2],
  };
}
