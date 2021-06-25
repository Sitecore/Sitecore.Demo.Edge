export default async function exit(_: any, res: any): Promise<void> {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
