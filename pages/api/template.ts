import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { template } = req.query;

  // Define the path to the template HTML file based on the 'template' query parameter
  const templateFilePath = path.join(process.cwd(), `public/template/${template}/index.html`);

  try {
    // Read the HTML content from the file synchronously
    const templateHtml = fs.readFileSync(templateFilePath, 'utf-8');

    res.status(200).send(templateHtml);
  } catch (error) {
    console.error("Error reading template HTML:", error);
    res.status(500).send('Error reading template HTML');
  }
}
