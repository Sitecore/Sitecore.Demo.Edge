import axios from 'axios';

export async function getIpAddress(): Promise<string> {
  const res = await axios.get('https://l2.io/ip');
  return res.data;
}
