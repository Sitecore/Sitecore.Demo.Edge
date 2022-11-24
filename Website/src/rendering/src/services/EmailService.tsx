import { isSendConfigured, SendScripts } from './SendService';

export const isEmailServiceConfigured = isSendConfigured;

export const EmailScripts: JSX.Element | undefined = SendScripts;
