import axios from 'axios';

export async function getIpAddress(): Promise<string> {
  const res = await axios.get('https://api.my-ip.io/ip');
  return res.data;
}
