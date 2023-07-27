import { identifyVisitor as identifyVisitorInCdp } from './CdpService';
import { identifyVisitor as identifyVisitorInSend } from './SendService';

export function identifyVisitor(
  email: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
): Promise<unknown> {
  identifyVisitorInSend(email, firstName, lastName);
  return identifyVisitorInCdp(email, firstName, lastName, phoneNumber);
}
