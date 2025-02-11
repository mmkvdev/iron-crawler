/**
 * 
 * @param {string} url URL to download the image from
 * @param {string} destination destination folder to write the downloaded asset to
 */
async function downloadImage({ url, destination }) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filename = path.basename(new URL(url).pathname);
        const filePath = path.join(destination, filename);
        fs.writeFileSync(filePath, response.data);
    } catch (error) {
        console.error(`Failed to download image: ${url}`, error.message);
    }
}

export { downloadImage };