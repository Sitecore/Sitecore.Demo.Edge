import axios from 'axios';

export async function getIpAddress(): Promise<string> {
  const res = await axios.get('https://jsonip.com');
  return res.data.json().ip;
}
