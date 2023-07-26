import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';
import { isEditingOrPreviewingPage } from '../helpers/LayoutServiceHelper';

const SEND_WEBSITE_ID = process.env.NEXT_PUBLIC_SEND_WEBSITE_ID || '';
export const isSendConfigured = !!SEND_WEBSITE_ID;
let isSendInitialized = false;
let cancelDelayedFunctions = false;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mootrack: any;
  }
}

export const SendScripts: JSX.Element | undefined = isSendConfigured ? (
  <>
    <Script id="sendTracker">{`
      //load TrackerJS
      // DEMO TEAM CUSTOMIZATION - Directly call d(o) when document.readyState === 'complete' to support incognito browser windows.
      !function(t,n,e,o,a){function d(t){var n=~~(Date.now()/3e5),o=document.createElement(e);o.async=!0,o.src=t+"?ts="+n;var a=document.getElementsByTagName(e)[0];a.parentNode.insertBefore(o,a)}t.MooTrackerObject=a,t[a]=t[a]||function(){return t[a].q?void t[a].q.push(arguments):void(t[a].q=[arguments])},document.readyState!=='complete'?(window.attachEvent?window.attachEvent("onload",d.bind(this,o)):window.addEventListener("load",d.bind(this,o),!1)):d(o)}(window,document,"script","//cdn.stat-track.com/statics/moosend-tracking.min.js","mootrack");
      // END CUSTOMIZATION
      `}</Script>
  </>
) : undefined;

export function initialize(pageState?: LayoutServicePageState): void {
  if (isSendInitialized) {
    return;
  }

  if (
    isSendConfigured &&
    (typeof pageState === 'undefined' || !isEditingOrPreviewingPage(pageState))
  ) {
    // tracker has to be initialized otherwise it will generate warnings and wont sendtracking events
    window.mootrack('init', SEND_WEBSITE_ID);

    // Re-initialize after navigating to every new page for Send forms to be fetched and displayed
    const pushState = history.pushState;
    history.pushState = (...rest) => {
      pushState.apply(history, rest);
      // Important to call init after pushState.apply for the CurrentUrlPath to be the right one
      window.mootrack('init', SEND_WEBSITE_ID);
    };

    isSendInitialized = true;
  } else {
    cancelDelayedFunctions = true;
  }
}

// ****************************************************************************
// Delaying calls is required due to race condition where calls can be executed
// before the Send library had finished initializing.
// ****************************************************************************
function delayUntilSendIsInitialized(functionToDelay: () => unknown) {
  if (!isSendConfigured || cancelDelayedFunctions) {
    return;
  }

  if (isSendInitialized) {
    functionToDelay();
  } else {
    const timeToWaitInMilliseconds = 100;
    console.log(
      `Send is not initialized yet. Waiting ${timeToWaitInMilliseconds}ms before retrying.`
    );
    window.setTimeout(delayUntilSendIsInitialized, timeToWaitInMilliseconds, functionToDelay);
  }
}

export function trackViewEvent(): void {
  delayUntilSendIsInitialized(() => window.mootrack('trackPageView'));
}

export function identifyVisitor(email: string, firstName?: string, lastName?: string): void {
  delayUntilSendIsInitialized(function () {
    if (firstName && lastName) {
      window.mootrack('identify', email, `${firstName} ${lastName}`);
    } else {
      window.mootrack('identify', email);
    }
  });
}
