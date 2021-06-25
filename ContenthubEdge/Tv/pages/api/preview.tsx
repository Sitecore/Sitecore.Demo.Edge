//import { request } from 'node:https';

export default async function handler(req: any, res: any): Promise<any> {
  res.setPreviewData({});
  if (req.query.slug) {
    let location = '/' + req.query.slug;
    res.writeHead(307, { Location: location });
  } else {
    res.writeHead(307, { Location: '/' });
  }
  res.end();
}
