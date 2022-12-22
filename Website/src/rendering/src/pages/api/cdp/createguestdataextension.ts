import { NextApiHandler } from 'next';
import { config } from './config';
import Cors from 'cors';
import { runNextApiMiddleware } from '../../../helpers/runNextApiMiddleware';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST'],
  origin: '*',
});

const handler: NextApiHandler<unknown> = async (request, response) => {
  await runNextApiMiddleware(request, response, cors);

  try {
    const resData = await fetch(
      `${config.apiTargetEndpoint}/guests/${request.query.guestRef}/ext${request.query.dataExtensionName}`,
      {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(request.body),
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
