import axios from 'axios';

export async function getIpAddress(): Promise<string> {
  const res = await axios.get('https://ipv4-a.jsonip.com');
  return res.data.ip;
}
