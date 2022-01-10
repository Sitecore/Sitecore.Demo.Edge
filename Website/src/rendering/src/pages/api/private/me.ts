/* eslint-disable */
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';

const userHandler = async (req: any, res: any) => {
  // const { body } = req;
  const body = { sample: new Date().toLocaleString() };

  const session = await getSession(req, res);
  const id = session?.user.sub;
  const accessToken = session?.accessToken;

  try {
    const params = body;
    const baseUrl = process.env.AUTH0_ISSUER_BASE_URL || '';

    const currentUserManagementClient = new ManagementClient({
      token: accessToken,
      domain: baseUrl.replace('https://', ''),
      scope: process.env.AUTH0_SCOPE,
    });

    const user = await currentUserManagementClient.updateUserMetadata({ id }, params);
    console.log(user);

    res.status(200).json(params);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default withApiAuthRequired(userHandler);
