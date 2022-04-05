import * as PortalSdk from '@ordercloud/portal-javascript-sdk';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';

class PortalService {
  constructor() {
    PortalSdk.Configuration.Set({
      baseApiUrl: 'https://portal.ordercloud.io/api/v1',
    });
  }

  async login(
    username: string,
    password: string,
    marketplaceID: string,
    environment: 'sandbox' | 'staging' | 'production'
  ): Promise<void> {
    try {
      const request = await PortalSdk.Auth.Login(username, password);
      PortalSdk.Tokens.SetAccessToken(request.access_token);
      await this.getMarketplace(marketplaceID);
      const marketplaceAuth = await PortalSdk.ApiClients.GetToken(marketplaceID);
      OrderCloudSDK.Configuration.Set({
        baseApiUrl: this.getOcBaseApiurl(environment),
      });
      OrderCloudSDK.Tokens.SetAccessToken(marketplaceAuth.access_token);
    } catch (error) {
      throw new Error(
        'Error logging in to portal. Please make sure your username and password are correct'
      );
    }
  }

  private async getMarketplace(marketplaceID: string) {
    try {
      return await PortalSdk.Organizations.Get(marketplaceID);
    } catch (error) {
      throw new Error(`Error retrieving marketplace with ID: ${marketplaceID}`);
    }
  }

  private getOcBaseApiurl(environment: 'sandbox' | 'staging' | 'production'): string {
    if (environment === 'sandbox') {
      return 'https://sandboxapi.ordercloud.io';
    } else if (environment === 'staging') {
      return 'https://stagingapi.ordercloud.io';
    } else {
      return 'https://api.ordercloud.io';
    }
  }
}

export default new PortalService();
