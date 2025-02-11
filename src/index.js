const { crawlBot } = require("./modules/crawler");

/**
 * Root module to implement web crawling
 * This function majorly takes in a pair of arguments from the user and invokes the `crawlBot` utility which performs the crawling
 */
const webCrawler = () => {
  // extract the arguments from the CLI
  const args = process.argv.slice(2);

  // validation to make sure that we are accepting mandatory arguments (URL and depth) from the user
  if (args.length !== 2) {
    console.error("Usage: node crawl.js <start_url> <depth>");
    process.exit(1);
  }

  const startUrl = args[0]; // starting point of crawl traversal
  const maxDepth = parseInt(args[1], 10); // depth of crawl traversal that the crawler bot module should go

  // validation to make sure that the supplied depth is a valid one
  if (isNaN(maxDepth) || maxDepth < 1) {
    console.error("Depth must be a positive integer.");
    process.exit(1);
  }

  crawlBot(startUrl, maxDepth);
};

webCrawler();
