import { NextApiHandler } from 'next';
import { config } from './config';

const handler: NextApiHandler<unknown> = async (request, response) => {
  try {
    const resData = await fetch(
      `${config.apiTargetEndpoint}/guests/${request.query.guestRef}/ext${request.query.dataExtensionName}`,
      {
        headers: config.headers,
      }
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response.status(200).json(resData);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export default handler;
