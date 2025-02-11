const cheerio = require('cheerio');
/**
 * This is a generic implementation for parsing pages using cheerio
 * this is basically a class generating a cheerio instance that can be re-used as many times as required
 */

class PageParser {
    constructor(html, baseUrl) {
        this.$ = cheerio.load(html);
        this.baseUrl = baseUrl;
    }

    getImages() {
        return this.$('img')
            .map((_, img) => new URL(this.$(img).attr('src'), this.baseUrl).href)
            .get();
    }

    getLinks() {
        return this.$('a')
            .map((_, link) => new URL(this.$(link).attr('href'), this.baseUrl).href)
            .get();
    }
}

module.exports = { PageParser };
