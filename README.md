# Web Crawler

A simple Node.js web crawler that downloads images from a website and saves them to a local directory. The crawler also stores metadata about the images in an `index.json` file.

## Features

- Crawls a given website and its child pages up to a specified depth
- Extracts and downloads all images found on the pages
- Saves metadata (image URLs, source pages, and depth) in `index.json`

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/mmkvdev/iron-crawler
npm i
```

## Usage

Run the crawler using the following command:

```sh
npm run crawl <start_url> <depth>
```

### Example:

```sh
npm run crawl https://www.scrapingcourse.com/ecommerce/ 2
```

- `<start_url>`: The starting page for crawling.
- `<depth>`: The depth of child pages to crawl (e.g., `1` means only the start page, `2` means one level deeper, etc.).
  ├── images # Stores downloaded images
  │ ├── index.json # JSON metadata file

## Project Structure

```
./src
├── index.js        # Entry point for the crawler
├── modules
│   ├── parser
│       ├── pageParser.js  # Singleton class to parse pages using Cheerio
│   ├── crawler.js   # core module composing the crawler functionality
├── utils
│   ├── downloadImage.js   # Utility function to download images and inject them at a specified location
│   ├── helpers.js   # we can add any helper functions as needed
├── package.json    # Project dependencies and scripts
└── README.md       # Documentation
```

## Output

- Images are saved in the `src/images` directory.
- `index.json` contains metadata about all downloaded images:

```json
{
  "images": [
    {
      "url": "https://www.scrapingcourse.com/ecommerce/wp-content/uploads/2024/03/mh09-blue_main.jpg",
      "page": "https://www.scrapingcourse.com/ecommerce/",
      "depth": 1
    }
  ]
}
```
