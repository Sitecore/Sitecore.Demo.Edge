require('dotenv').config();
var chainsaw = require('../');

var env = {
  apiEndpoint: process.env.API_TARGET_ENDPOINT,
  clientKey: process.env.CDP_CLIENT_KEY,
  channel: 'MOBILE_APP',
  language: 'EN',
  currencyCode: 'CAD',
  pointOfSale: 'PLAY! Summit',
  guestFirstName: process.env.GUEST_FIRST_NAME,
  guestLastName: process.env.GUEST_LAST_NAME,
  guestEmail: process.env.GUEST_EMAIL,
};

const baseEvent = {
  browser_id: '{{browserId}}',
  channel: '{{channel}}',
  language: '{{language}}',
  currency: '{{currencyCode}}',
  pos: '{{pointOfSale}}',
};

function getEventAction(event) {
  return {
    url: 'https://{{apiEndpoint}}/v1.2/event/create.json?client_key={{clientKey}}&message={{message}}',
    prepare: function (context) {
      context.sessionVariables.message = JSON.stringify(
        chainsaw.replaceAllVariables(
          {
            ...baseEvent,
            ...event,
          },
          context
        )
      );
    },
  };
}

chainsaw
  .create()
  .version()
  .sleep(500)
  .env(env)

  // setup
  .get('Create Browser', {
    url: 'https://{{apiEndpoint}}/v1.2/browser/create.json?client_key={{clientKey}}&message={}',
    callback: function (context) {
      var data = JSON.parse(context.response);
      console.log('Browser Ref: ' + data.ref);
      context.sessionVariables.browserId = data.ref;
    },
  })

  .get(
    'Add Kiosk Home Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/',
    })
  )

  .get(
    'Add Kiosk Hero Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/start',
    })
  )

  .get(
    'Add Kiosk Schedule Day 1 Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/schedule/0',
    })
  )

  .get(
    'Add Kiosk Schedule Day 2 Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/schedule/1',
    })
  )

  .get(
    'Add Kiosk Tickets Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/tickets',
    })
  )

  .get(
    'Add Kiosk Checkout Regular Ticket Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/payment/1',
    })
  )

  .get(
    'Add Identity Event',
    getEventAction({
      type: 'IDENTITY',
      page: '/payment/1',
      firstname: '{{guestFirstName}}',
      lastname: '{{guestLastName}}',
      email: '{{guestEmail}}',
      identifiers: [
        {
          provider: 'email',
          id: '{{guestEmail}}',
        },
      ],
    })
  )

  .get(
    'Add Regular Ticket Purchase Event',
    getEventAction({
      type: 'TICKET_PURCHASED',
      page: '/payment/1',
      ticketId: 1,
      ticketName: 'Regular Ticket',
      pricePaid: 199,
    })
  )

  // TODO: Add data extension to Ticket #1

  .get(
    'Add Kiosk Regular Ticket Payment Confirmed Page View Event',
    getEventAction({
      type: 'VIEW',
      page: '/payment/confirmed/1?email={{guestEmail}}',
    })
  )

  // forceClose
  .get(
    'Add Force Close Event',
    getEventAction({
      type: 'FORCE_CLOSE',
      page: '/',
    })
  )

  // Switch to website

  .get(
    'Add Website Home Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/?email={{guestEmail}}',
      sitecoreTemplateName: 'Webpage',
    })
  )

  .get(
    'Add Identity Event',
    getEventAction({
      channel: 'WEB',
      type: 'IDENTITY',
      page: '/?email={{guestEmail}}',
      sitecoreTemplateName: 'Webpage',
      firstname: '{{guestFirstName}}',
      lastname: '{{guestLastName}}',
      email: '{{guestEmail}}',
      identifiers: [
        {
          provider: 'email',
          id: '{{guestEmail}}',
        },
      ],
    })
  )

  .get(
    'Add Website Sessions Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/sessions',
      sitecoreTemplateName: 'Webpage',
    })
  )

  .get(
    'Add Website "SEVEN MINDSET STRATEGIES TO RAISE YOUR GAME" session Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/sessions/7%20mindset%20strategies%20to%20raise%20your%20game',
      sitecoreTemplateName: 'Session',
      premiumContent: false,
    })
  )

  .get(
    'Add Website Sessions Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/sessions',
      sitecoreTemplateName: 'Webpage',
    })
  )

  .get(
    'Add Website "Meet a pro: Q&A with Chris Williams" session Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/sessions/Meet%20a%20pro%20QA%20with%20Chris%20Williams',
      sitecoreTemplateName: 'Session',
      premiumContent: true,
    })
  )

  .get(
    'Add Website Checkout Payment Information Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/tickets/payment?ticket=3',
      sitecoreTemplateName: 'Webpage',
    })
  )

  .get(
    'Add Regular to VIP Ticket Upgrade Purchase Event',
    getEventAction({
      channel: 'WEB',
      type: 'TICKET_PURCHASED',
      page: '/tickets/payment?ticket=3',
      ticketId: 3,
      ticketName: 'Regular to VIP Ticket Upgrade',
      pricePaid: 200,
    })
  )

  // TODO: Add data extension to Ticket #2 (VIP)

  .get(
    'Add Website Checkout Payment Confirmation Page View Event',
    getEventAction({
      channel: 'WEB',
      type: 'VIEW',
      page: '/tickets/payment/confirmed?ticket=3',
      sitecoreTemplateName: 'Webpage',
    })
  )

  // forceClose
  .get(
    'Add Force Close Event',
    getEventAction({
      channel: 'WEB',
      type: 'FORCE_CLOSE',
      page: '/',
    })
  )

  .execute();
