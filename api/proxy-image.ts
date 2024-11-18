import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';



export default async function handler(req: VercelRequest, res: VercelResponse) {
  const imageUrl = req.query.url; // Pass the target image URL as a query parameter

  if(Array.isArray(imageUrl)){
    res.status(400).send("invalid url parameter")
    return
  }

  try {
    // Fetch the image data from the external source
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Send the image data as the response
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching the image:', error.message);
    res.status(500).send('Failed to fetch the image.');
  }
}

