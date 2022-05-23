import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userHandler = async (req: any, res: any) => {
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
      scope:
        'openid profile email read:current_user create:current_user_metadata read:current_user_metadata update:current_user_metadata',
    });

    const user = await currentUserManagementClient.updateUserMetadata({ id }, params);
    res.status(200).json(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err?.message });
  }
};

export default withApiAuthRequired(userHandler);
