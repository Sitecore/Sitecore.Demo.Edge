import { venueI, roomI, timeslotI } from '@/interfaces/index';
import {
  IntentTagVector,
  IntentTags,
  IntentTagStrength,
} from '@uniformdev/optimize-common';

export const convertIntents = (value: string[]): IntentTags | undefined | null => {
  if (!value.length) {
    return null;
  }

  return {
    intents: value.reduce<IntentTagVector>((previous, current) => {
      previous[current] = {
        str: 50,
      };
      return previous;
    }, {}),
  };
};

export function venuesParse(venuesFeed: any): venueI[] {
  console.log(venuesFeed);
  const venueArray: venueI[] = [];
  venueArray.pop();

  venuesFeed.data.allEG_Venue.results.map((p: any) => {
    const roomArray: roomI[] = [];
    roomArray.pop();

    p.venue_Room.results.map((pa: any) => {

      const timeslotArray: timeslotI[] = [];
      timeslotArray.pop();

      pa.room_Timeslot.results.map((ts: any) => {
          const timeslot: timeslotI = {
            id: ts.id,
            name: ts.taxonomyName,
          };
          timeslotArray.push(timeslot);
      });

      const asset: roomI = {
          id: pa.id,
          name: pa.taxonomyName,
          description: pa.taxonomyLabel,
          timeslots: timeslotArray
        };
        roomArray.push(asset);
    });

    const venue: venueI = {
      id: p.id,
      name: p.taxonomyName,
      description: p.description,
      rooms: roomArray,
      slug: p.taxonomyName,
    };
    venueArray.push(venue);
  });
  return venueArray;
}
