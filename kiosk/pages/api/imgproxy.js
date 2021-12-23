import { request } from 'axios';

export default async (req, res) => {
  const readable = await request({
    url: req.query.url,
    responseType: 'stream',
  });

  await readable.data.pipe(res);
};
