import axios from 'axios';

export async function getIpAddress(): Promise<string> {
  const res = await axios.get('https://ipv4.jsonip.com');
  console.log(res);
  console.log(res.data);
  return res.data.ip;
}
