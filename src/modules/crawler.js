const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { URL } = require("url");
const { PageParser } = require("./parser/pageParser");

// output directory to propagate the crawled images to
const OUTPUT_DIR = path.join(process.cwd(), "images");

// the final index file to which images and links are injected to
const INDEX_FILE = path.join(OUTPUT_DIR, "index.json");

// set to keep track of visited urls so that there's no duplicate traversal
const visitedUrls = new Set();

// priority queue to emphasize certain URLs
let imagesList = [];

// if the output directory doesn't exist, create it
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// add to the existing images.json file instead of overriding it
if (fs.existsSync(INDEX_FILE)) {
  imagesList = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8")).images;
}

/**
 * @param {string} startUrl URL to start the traversal from
 * @param {*} maxDepth the maximum depth the crawler can traverse and index accordingly
 */
async function crawlBot(startUrl, maxDepth) {
  const queue = [{ url: startUrl, depth: 1 }];

  while (queue.length > 0) {
    const { url, depth } = queue.shift();
    if (visitedUrls.has(url) || depth > maxDepth) continue;
    visitedUrls.add(url);

    console.log(`Crawling: ${url} (Depth: ${depth})`);
    try {
      const { data } = await axios.get(url, { timeout: 10000 });
      const parser = new PageParser(data, url);

      // iteratively extract all images and push them to the queue
      parser.getImages().forEach((imgUrl) => {
        if (!imagesList.some((i) => i.url === imgUrl)) {
          imagesList.push({ url: imgUrl, page: url, depth });
        }
      });

      // iteratively extract all asset links and keep track of them in the queue
      parser.getLinks().forEach((nextUrl) => {
        if (!visitedUrls.has(nextUrl) && depth < maxDepth) {
          queue.push({ url: nextUrl, depth: depth + 1 });
        }
      });
    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error.message);
    }
  }

  // save all the crawled contents to the `index.json` file
  saveIndexFile();
  console.log("Crawling complete. Images saved in images/");
}

// save all the prioritised images to the specified directory
function saveIndexFile() {
  fs.writeFileSync(INDEX_FILE, JSON.stringify({ images: imagesList }, null, 2));
}

module.exports = { crawlBot };
