import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Script from 'next/script';
import BoxeverServiceConfig from './BoxeverServiceConfig';

// ***** TYPES *****

type boxeverQueueFunctionType = () => void;

interface eventCreateResponse {
  status: string;
}

type eventCreateCallbackType = (
  // eslint-disable-next-line no-unused-vars
  response: eventCreateResponse
) => void;

type callFlowsCallbackType = (
  // eslint-disable-next-line no-unused-vars
  response: unknown
) => void;

interface browserCreateResponse {
  ref: string;
}

type browserCreateCallbackType = (
  // eslint-disable-next-line no-unused-vars
  data: browserCreateResponse
) => void;

interface Boxever {
  getID(): string;
  eventCreate(
    // eslint-disable-next-line no-unused-vars
    payload: Record<string, unknown>,
    // eslint-disable-next-line no-unused-vars
    callback: eventCreateCallbackType,
    // eslint-disable-next-line no-unused-vars
    type: string
  ): void;
  callFlows(
    // eslint-disable-next-line no-unused-vars
    payload: Record<string, unknown>,
    // eslint-disable-next-line no-unused-vars
    callback: callFlowsCallbackType,
    // eslint-disable-next-line no-unused-vars
    type: string
  ): void;
  storage: {
    removeItem(
      // eslint-disable-next-line no-unused-vars
      name: string
    ): void;
    setItem(
      // eslint-disable-next-line no-unused-vars
      name: string,
      // eslint-disable-next-line no-unused-vars
      browserId: string,
      // eslint-disable-next-line no-unused-vars
      cookieExpiresDays: number | { TTL: number }
    ): void;
  };
  cookie_name: string;
  browserCreate(
    // eslint-disable-next-line no-unused-vars
    payload: Record<string, unknown>,
    // eslint-disable-next-line no-unused-vars
    callback: browserCreateCallbackType,
    // eslint-disable-next-line no-unused-vars
    type: string
  ): void;
  browser_id: string;
  isITPBrowser: boolean;
  cookie_expires_days: number;
  storage_ttl: number;
  initWebFlowSDK(): void;
}

declare global {
  interface Window {
    _boxever_settings: {
      client_key: string;
      target: string;
      cookie_domain: string;
    };
    Boxever: Boxever;
    _boxever: Boxever;
    _boxeverq: boxeverQueueFunctionType[];
    __boxeverQueue: {
      new (): [];
    };
    BoxeverJERS: {
      errors: unknown[];
    };
  }
}

type GuestRef = string;

interface GuestRefResponse {
  guestRef: GuestRef;
}

interface GuestProfile {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

type GuestProfileResponse = GuestProfile | undefined;

// ***** API *****

const POINT_OF_SALE = 'PLAY! Summit';
const CURRENCY = 'USD';

const CDP_CLIENT_KEY = process.env.NEXT_PUBLIC_CDP_CLIENT_KEY || '';
const CDP_API_TARGET_ENDPOINT = process.env.NEXT_PUBLIC_CDP_API_TARGET_ENDPOINT || '';
export const isCdpConfigured = !!CDP_CLIENT_KEY && !!CDP_API_TARGET_ENDPOINT;

export const BoxeverScripts: JSX.Element | undefined = isCdpConfigured ? (
  <>
    <Script id="cdpSettings">{`
      // Define the Boxever queue
      var _boxeverq = _boxeverq || [];

      // Define the Boxever settings
      _boxever_settings = {
        client_key: '${CDP_CLIENT_KEY}',
        target: '${CDP_API_TARGET_ENDPOINT}',
        cookie_domain: '.edge.localhost',
        pointOfSale: '${POINT_OF_SALE}',
        web_flow_target: 'https://d35vb5cccm4xzp.cloudfront.net',
      };`}</Script>
    <Script src="https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js"></Script>
  </>
) : undefined;

function isBoxeverConfiguredInBrowser(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window._boxever_settings &&
    window._boxever_settings.client_key
  );
}

function getConfigWithCurrentPage(config: Record<string, unknown>, page?: string) {
  return Object.assign(
    {
      page: page || window.location.pathname + window.location.search,
    },
    config
  );
}

function getLanguage() {
  let language = window?.navigator?.language ? window.navigator.language : 'en';

  if (language.length > 2) {
    language = language.slice(0, 2);
  }

  return language;
}

function createBasePayload(eventConfig: Record<string, unknown>) {
  return Object.assign(
    {
      channel: BoxeverServiceConfig.channel,
      language: getLanguage(),
      websiteBaseUrl: BoxeverServiceConfig.websiteBaseUrl,
    },
    eventConfig
  );
}

function createEventPayload(eventConfig: Record<string, unknown>) {
  return Object.assign(createBasePayload(eventConfig), {
    currency: CURRENCY,
    pos: POINT_OF_SALE,
    browser_id: window.Boxever.getID(),
  });
}

function createFlowPayload(flowConfig: Record<string, unknown>) {
  return Object.assign(createBasePayload(flowConfig), {
    currencyCode: CURRENCY,
    pointOfSale: POINT_OF_SALE,
    browserId: window.Boxever.getID(),
    clientKey: window._boxever_settings.client_key,
  });
}

// ****************************************************************************
// Delaying calls is required due to some race conditions where a guest
// identification call was executed before the Boxever library had finished
// initializing.
// ****************************************************************************
function delayUntilBoxeverIsReady(functionToDelay: () => unknown) {
  if (window.Boxever && window.Boxever.getID() !== 'anonymous' && window._boxeverq) {
    functionToDelay();
  } else {
    const timeToWaitInMilliseconds = 100;
    console.log(`Boxever is not ready yet. Waiting ${timeToWaitInMilliseconds}ms before retrying.`);
    window.setTimeout(delayUntilBoxeverIsReady, timeToWaitInMilliseconds, functionToDelay);
  }
}

function sendEventCreate(eventConfig: Record<string, unknown>, page?: string) {
  if (typeof window === 'undefined' || !isBoxeverConfiguredInBrowser()) {
    return new Promise<void>(function (resolve) {
      resolve();
    });
  }

  // Set the page now as the location might have already changed when createEventPayload will be executed.
  const eventWithCurrentPage = getConfigWithCurrentPage(eventConfig, page);

  return new Promise(function (resolve, reject) {
    try {
      delayUntilBoxeverIsReady(function () {
        window._boxeverq.push(function () {
          window.Boxever.eventCreate(
            // Set the browserId on the event just before sending it to ensure it is up to date.
            createEventPayload(eventWithCurrentPage),
            function (response) {
              if (!response) {
                reject('No response provided.');
              }
              if (response.status !== 'OK') {
                reject('Response status: ' + response.status);
              }
              resolve(response);
            },
            'json'
          );
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

function callFlows(flowConfig: Record<string, unknown>) {
  if (typeof window === 'undefined' || !isBoxeverConfiguredInBrowser()) {
    return new Promise<void>(function (resolve) {
      resolve();
    });
  }

  // Set the page now as the location might have already changed when createFlowPayload will be executed.
  const eventWithCurrentPage = getConfigWithCurrentPage(flowConfig);

  return new Promise(function (resolve, reject) {
    try {
      delayUntilBoxeverIsReady(function () {
        window._boxeverq.push(function () {
          window.Boxever.callFlows(
            // Set the browserId on the flow just before sending it to ensure it is up to date.
            createFlowPayload(eventWithCurrentPage),
            function (response) {
              if (!response) {
                reject('No response provided.');
              }
              resolve(response);
            },
            'json'
          );
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

// Boxever view page tracking
export function logViewEvent(
  additionalData?: Record<string, unknown>,
  page?: string
): Promise<unknown> {
  const eventConfig = Object.assign(
    {
      type: 'VIEW',
    },
    additionalData
  );

  return sendEventCreate(eventConfig, page);
}

export function logEvent(eventName: string, payload?: Record<string, unknown>): Promise<unknown> {
  const eventConfig = {
    type: eventName,
    ...payload,
  };

  return sendEventCreate(eventConfig);
}

// Boxever identification
export function identifyVisitor(
  email: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
): Promise<unknown> {
  const eventConfig: Record<string, unknown> = {
    type: 'IDENTITY',
    email: email,
    identifiers: [
      {
        provider: 'email',
        id: email,
      },
    ],
  };
  if (firstName) {
    eventConfig.firstname = firstName;
  }
  if (lastName) {
    eventConfig.lastname = lastName;
  }
  if (phoneNumber) {
    eventConfig.phone = phoneNumber;
  }

  return sendEventCreate(eventConfig);
}

// ****************************************************************************
// Closes current Boxever browsing session.
// ****************************************************************************
export function closeSession(): Promise<unknown> {
  return logEvent('FORCE_CLOSE', {
    _bx_extended_message: '1',
  });
}

// ****************************************************************************
// Flush Boxever local storage for current guest and starts a new anonymous
// visitor session.
// Code from that function is coming mostly from the Boxever library and
// organized to return a promise to know when the asynchronous parts are done.
// ****************************************************************************
export function forgetCurrentGuest(): Promise<void> {
  if (typeof window === 'undefined' || !isBoxeverConfiguredInBrowser()) {
    return new Promise<void>(function (resolve) {
      resolve();
    });
  }

  return new Promise<void>(function (resolve, reject) {
    try {
      // Code copied from Boxever library
      window._boxeverq = [];
      if (window.Boxever.storage) {
        window.Boxever.storage.removeItem(window.Boxever.cookie_name);
      }

      window.Boxever.browserCreate(
        {},
        function (data) {
          try {
            if (!data || !data.ref) {
              reject('No response or ref provided.');
            }

            // Code copied from Boxever library to make it into a promise
            window._boxever.browser_id = data.ref;
            // If ITP Version of Safari set storage with storage_ttl
            if (window._boxever.isITPBrowser) {
              window._boxever.storage.setItem(
                window._boxever.cookie_name,
                window._boxever.browser_id,
                { TTL: window._boxever.storage_ttl }
              );
            } else {
              // Set the cookie expiration time to be the current time
              // plus cookie_expires_days
              window._boxever.storage.setItem(
                window._boxever.cookie_name,
                window._boxever.browser_id,
                window._boxever.cookie_expires_days
              );
            }
            // get the existing _boxeverq array
            const _old_boxeverq = window._boxeverq;
            // create a new _boxeverq object
            window._boxeverq = new window.__boxeverQueue();
            // execute all of the queued up events - apply()
            // turns the array entries into individual arguments
            // eslint-disable-next-line prefer-spread
            window._boxeverq.push.apply(window._boxeverq, _old_boxeverq);
            window._boxever.initWebFlowSDK();
            resolve();
          } catch (e) {
            window.BoxeverJERS.errors.push(e);
            reject(e);
          }
        },
        'json'
      );
    } catch (err) {
      reject(err);
    }
  });
}

// ****************************************************************************
// Gets the current guest ref by calling a CDP flow.
// This is a workaround needed when an anonymous guest identify itself as a
// previously known guest, CDP is merging the 2 guests. The browser keeps the
// anonymous guest ref. From that moment, calls to the authenticated CDP APIs
// like get/set for data extensions are failing when using this old anonymous
// guest ref. These calls require the previously known guest ref which is
// returned by our flow.
// ****************************************************************************
export function getGuestRef(): Promise<GuestRefResponse> {
  return callFlows({
    friendlyId: 'getguestref',
  }) as Promise<GuestRefResponse>;
}

function boxeverPost(action: string, payload?: Record<string, unknown>): AxiosPromise<unknown> {
  const url = `${BoxeverServiceConfig.proxyUrl}${action}`;

  const options: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: payload,
    withCredentials: false,
    url,
  };

  return axios(options);
}

function boxeverGet(action: string, payload?: Record<string, unknown>): AxiosPromise<unknown> {
  const url = `${BoxeverServiceConfig.proxyUrl}${action}`;

  const options: AxiosRequestConfig = {
    method: 'GET',
    params: payload,
    withCredentials: false,
    url,
  };

  return axios(options);
}

// TEMP: Keeping this commented method for near future use
// function boxeverDelete(action: string, payload?: Record<string, unknown>): AxiosPromise<unknown> {
//   const url = `${BoxeverServiceConfig.proxyUrl}${action}`;

//   const options: AxiosRequestConfig = {
//     method: 'DELETE',
//     headers: {
//       'content-type': 'application/json',
//     },
//     data: payload,
//     withCredentials: false,
//     url,
//   };

//   return axios(options);
// }

// ********************************
// Data Extensions
// ********************************
export function saveDataExtension(
  dataExtensionName: string,
  payload?: Record<string, unknown>
): Promise<unknown> {
  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise<undefined>(function (resolve) {
      resolve(undefined);
    });
  }

  return getGuestRef().then((response) =>
    boxeverPost(
      `/createguestdataextension?guestRef=${response.guestRef}&dataExtensionName=${dataExtensionName}`,
      payload
    )
  );
}

// ********************************
// Get non-expanded guest profile
// ********************************
function getGuestProfilePromise(guestRef: GuestRef): Promise<GuestProfileResponse> {
  return boxeverGet(`/getguestbyref?guestRef=${guestRef}`) as Promise<GuestProfileResponse>;
}

function getGuestProfileResponse(guestRef?: GuestRef): Promise<GuestProfileResponse> {
  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise<undefined>(function (resolve) {
      resolve(undefined);
    });
  }

  if (!guestRef) {
    return getGuestRef().then((response) => getGuestProfilePromise(response.guestRef));
  } else {
    return getGuestProfilePromise(guestRef);
  }
}

// ********************************
// isAnonymousGuest
// ********************************
function isAnonymousGuestInGuestResponse(guestResponse: GuestProfileResponse): boolean {
  return !guestResponse?.data?.email;
}

export function isAnonymousGuest(guestRef?: GuestRef): Promise<boolean> {
  const defaultValue = true;

  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise<boolean>(function (resolve) {
      resolve(defaultValue);
    });
  }

  return getGuestProfileResponse(guestRef)
    .then((guestResponse) => isAnonymousGuestInGuestResponse(guestResponse))
    .catch((e) => {
      console.log(e);
      return defaultValue;
    });
}

// ********************************
// getGuestFullName
// ********************************
function getGuestFullNameInGuestResponse(guestResponse: GuestProfileResponse): string | undefined {
  const data = guestResponse?.data;

  if (!data || !data.firstName || !data.lastName) {
    return undefined;
  }

  return `${data.firstName} ${data.lastName}`;
}

function getGuestFirstNameInGuestResponse(guestResponse: GuestProfileResponse): string | undefined {
  const data = guestResponse?.data;

  if (!data || !data.firstName) {
    return undefined;
  }

  return data.firstName;
}

function getGuestLastNameInGuestResponse(guestResponse: GuestProfileResponse): string | undefined {
  const data = guestResponse?.data;

  if (!data || !data.lastName) {
    return undefined;
  }

  return data.lastName;
}

export function getGuestFullName(guestRef?: GuestRef): Promise<string | undefined> {
  const defaultValue = '';

  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise(function (resolve) {
      resolve(defaultValue);
    });
  }

  return getGuestProfileResponse(guestRef)
    .then((guestResponse) => getGuestFullNameInGuestResponse(guestResponse))
    .catch((e) => {
      console.log(e);
      return defaultValue;
    });
}

export function getGuestFirstName(guestRef?: GuestRef): Promise<string | undefined> {
  const defaultValue = '';

  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise(function (resolve) {
      resolve(defaultValue);
    });
  }

  return getGuestProfileResponse(guestRef)
    .then((guestResponse) => getGuestFirstNameInGuestResponse(guestResponse))
    .catch((e) => {
      console.log(e);
      return defaultValue;
    });
}

export function getGuestLastName(guestRef?: GuestRef): Promise<string | undefined> {
  const defaultValue = '';

  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise(function (resolve) {
      resolve(defaultValue);
    });
  }

  return getGuestProfileResponse(guestRef)
    .then((guestResponse) => getGuestLastNameInGuestResponse(guestResponse))
    .catch((e) => {
      console.log(e);
      return defaultValue;
    });
}

// ********************************
// getGuestEmail
// ********************************
function getGuestEmailInGuestResponse(guestResponse: GuestProfileResponse): string | undefined {
  const data = guestResponse?.data;

  if (!data?.email) {
    return undefined;
  }

  return data.email.replaceAll(' ', '+');
}

export function getGuestEmail(guestRef?: GuestRef): Promise<string | undefined> {
  const defaultValue = '';

  if (!isBoxeverConfiguredInBrowser()) {
    return new Promise(function (resolve) {
      resolve(defaultValue);
    });
  }

  return getGuestProfileResponse(guestRef)
    .then((guestResponse) => getGuestEmailInGuestResponse(guestResponse))
    .catch((e) => {
      console.log(e);
      return defaultValue;
    });
}

// ********************************
// Get Dynamic welcome message
// ********************************
export interface WelcomeMessage {
  message: string;
}

export function getDynamicWelcomeMessage(
  ipAddress: string,
  language: string
): Promise<WelcomeMessage> {
  return callFlows({
    params: {
      ipAddress,
      browserLanguage: language,
    },
    friendlyId: 'dynamic_welcome_message',
  }) as Promise<WelcomeMessage>;
}

// ***************************
// Used to determine if the session should be closed
// in case of a QR code scan from the TV app
// ***************************
export interface ShouldCloseSessionResponse {
  shouldCloseCurrentSession: string;
}

export function shouldCloseSession(): Promise<ShouldCloseSessionResponse> {
  return callFlows({
    friendlyId: 'should_close_current_session',
  }) as Promise<ShouldCloseSessionResponse>;
}
