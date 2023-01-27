import { RouteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { logViewEvent as trackViewEventInCdp } from './CdpService';
import { trackViewEvent as trackViewEventInSend } from './SendService';

export function trackViewEvent(route?: RouteData): Promise<unknown> {
  trackViewEventInSend();
  return trackViewEventInCdp(route);
}
