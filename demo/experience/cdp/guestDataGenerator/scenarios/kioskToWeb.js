require('dotenv').config();
var chainsaw = require('..');
var uuid = require('uuid');

const apiTargetEndpoint = process.env.API_TARGET_ENDPOINT;
const cdpClientKey = process.env.CDP_CLIENT_KEY;
const cdpApiToken = process.env.CDP_API_TOKEN;
const guestFirstName = process.env.GUEST_FIRST_NAME;
const guestLastName = process.env.GUEST_LAST_NAME;
const guestEmail = process.env.GUEST_EMAIL;

if (
  !apiTargetEndpoint ||
  !cdpClientKey ||
  !cdpApiToken ||
  !guestFirstName ||
  !guestLastName ||
  !guestEmail
) {
  console.error('All environment variables must be provided.');
} else {
  var env = {
    apiEndpoint: apiTargetEndpoint,
    clientKey: cdpClientKey,
    channel: 'MOBILE_APP',
    language: 'EN',
    currencyCode: 'USD',
    pointOfSale: 'PLAY! Summit',
    guestFirstName: guestFirstName,
    guestLastName: guestLastName,
    guestEmail: guestEmail,
  };

  var vipTicketUpgradePurchaseDate = new Date(new Date().toUTCString());
  var regularTicketPurchaseDate = new Date(new Date().toUTCString());
  regularTicketPurchaseDate.setMinutes(regularTicketPurchaseDate.getMinutes() - 30);
  var emailUotr = uuid.v4();

  function getEventAction(event) {
    return {
      url: 'https://{{apiEndpoint}}/v1.2/event/create.json?client_key={{clientKey}}&message={{message}}',
      prepare: function (context) {
        context.sessionVariables.message = JSON.stringify(
          chainsaw.replaceAllVariables(
            {
              browser_id: '{{browserId}}',
              channel: '{{channel}}',
              language: '{{language}}',
              currency: '{{currencyCode}}',
              pos: '{{pointOfSale}}',
              pointOfSale: '{{pointOfSale}}',
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

    // Setup

    .get('Create Browser', {
      url: 'https://{{apiEndpoint}}/v1.2/browser/create.json?client_key={{clientKey}}&message={}',
      callback: function (context) {
        var data = JSON.parse(context.response);
        console.log('Browser Ref: ' + data.ref);
        context.sessionVariables.browserId = data.ref;
      },
    })

    // Kiosk session

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

    .get(
      'Add Regular Ticket Order Checkout Event',
      getEventAction({
        type: 'ORDER_CHECKOUT',
        page: '/payment/1',
        order: {
          referenceId: '{{$guid}}',
          orderedAt: regularTicketPurchaseDate.toISOString(),
          status: 'PURCHASED',
          currencyCode: '{{currencyCode}}',
          price: 199,
          paymentType: 'Card',
          cardType: 'Visa',
          orderItems: [
            {
              type: 'TICKET',
              referenceId: '{{$guid}}',
              orderedAt: regularTicketPurchaseDate.toISOString(),
              status: 'PURCHASED',
              currencyCode: '{{currencyCode}}',
              price: 199,
              name: 'Regular Ticket',
              productId: 'TICKET_1',
              quantity: 1,
            },
          ],
        },
      })
    )

    .get(
      'Add Email Sent Event',
      getEventAction({
        serviceIdentifier: 'SITECORE_SEND',
        type: 'SENT',
        occurredAt: regularTicketPurchaseDate.toISOString(),
        uotr: emailUotr,
      })
    )

    .get(
      'Add Email Delivered Event',
      getEventAction({
        serviceIdentifier: 'SITECORE_SEND',
        type: 'DELIVERED',
        occurredAt: regularTicketPurchaseDate.toISOString(),
        uotr: emailUotr,
      })
    )

    .get(
      'Add Kiosk Regular Ticket Payment Confirmed Page View Event',
      getEventAction({
        type: 'VIEW',
        page: '/payment/confirmed/1?email={{guestEmail}}',
      })
    )

    .get(
      'Add Force Close Event',
      getEventAction({
        type: 'FORCE_CLOSE',
        page: '/',
      })
    )

    // Email session

    .get(
      'Add Email Viewed Event',
      getEventAction({
        serviceIdentifier: 'SITECORE_SEND',
        channel: 'EMAIL',
        type: 'VIEWED',
        occurredAt: vipTicketUpgradePurchaseDate.toISOString(),
        uotr: emailUotr,
      })
    )

    .get(
      'Add Email Clicked Event',
      getEventAction({
        serviceIdentifier: 'SITECORE_SEND',
        channel: 'EMAIL',
        type: 'CLICKED',
        occurredAt: vipTicketUpgradePurchaseDate.toISOString(),
        uotr: emailUotr,
      })
    )

    .get(
      'Add Force Close Event',
      getEventAction({
        channel: 'EMAIL',
        type: 'FORCE_CLOSE',
      })
    )

    // Website session

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

    // Imagine the guest is presented with the "Premium Session Page - VIP Ticket Upgrade" web experience on that premium session page because he owns a regular ticket. He clicks on the web experience button.

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

    .get(
      'Add Regular to VIP Ticket Upgrade Order Checkout Event',
      getEventAction({
        type: 'ORDER_CHECKOUT',
        page: '/tickets/payment?ticket=3',
        order: {
          referenceId: '{{$guid}}',
          orderedAt: vipTicketUpgradePurchaseDate.toISOString(),
          status: 'PURCHASED',
          currencyCode: '{{currencyCode}}',
          price: 200,
          paymentType: 'Card',
          cardType: 'Visa',
          orderItems: [
            {
              type: 'TICKET',
              referenceId: '{{$guid}}',
              orderedAt: vipTicketUpgradePurchaseDate.toISOString(),
              status: 'PURCHASED',
              currencyCode: '{{currencyCode}}',
              price: 200,
              name: 'Regular to VIP Ticket Upgrade',
              productId: 'TICKET_3',
              quantity: 1,
            },
          ],
        },
      })
    )

    .get(
      'Add Website Checkout Payment Confirmation Page View Event',
      getEventAction({
        channel: 'WEB',
        type: 'VIEW',
        page: '/tickets/payment/confirmed?ticket=3',
        sitecoreTemplateName: 'Webpage',
      })
    )

    .get(
      'Add Force Close Event',
      getEventAction({
        channel: 'WEB',
        type: 'FORCE_CLOSE',
        page: '/',
      })
    )

    // Add data extension

    .get('Get Guest Ref', {
      url: 'https://{{apiEndpoint}}/v2/callFlows?message={{message}}',
      prepare: function (context) {
        context.sessionVariables.message = JSON.stringify(
          chainsaw.replaceAllVariables(
            {
              clientKey: '{{clientKey}}',
              browserId: '{{browserId}}',
              channel: 'INVALID_CHANNEL_TO_HIDE_FROM_TIMELINE',
              language: '{{language}}',
              currency: '{{currencyCode}}',
              pos: '{{pointOfSale}}',
              pointOfSale: '{{pointOfSale}}',
              friendlyId: 'getguestref',
            },
            context
          )
        );
      },
      callback: function (context) {
        var data = JSON.parse(context.response);
        context.sessionVariables.guestRef = data.guestRef;
      },
    })

    .basicAuth(cdpClientKey, cdpApiToken)
    .post('Add Ticket Data Extension', {
      url: 'https://{{apiEndpoint}}/v2/guests/{{guestRef}}/extTicket',
      body: JSON.stringify({
        key: 'Ticket',
        ticketId: 2,
        ticketName: 'VIP Ticket',
      }),
    })

    .execute();
}
