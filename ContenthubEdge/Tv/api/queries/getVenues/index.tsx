import { fetchGraphQL } from '../../../api';
import { venueI } from '@/interfaces/index';
import { venuesParse } from '../sharedFunctions';

export const getVenues = async (
  preview: boolean,
): Promise<{ venues: venueI[] }> => {
  try {
    const venuesQuery: any = `
    query {
      allEG_Venue {
        results {
          id
          taxonomyName
          description
          event_Venue {
            taxonomyName
            description
            startDate
            endDate
            event_City {
              taxonomyName
            }
            event_days {
              results {
                taxonomyName
                day_Session {
                  results {
                    taxonomyName
                    session_Room {
                      taxonomyName
                    }
                  }
                }
              }
            }
          }
          venue_Room {
            results {
              id
              taxonomyName
              taxonomyLabel
              room_Timeslot {
                results {
                  id
                  taxonomyName
                }
              }
            }
          }
        }
      }
    }
    `;
    const venueFeed: any = await fetchGraphQL(venuesQuery, preview);
    const venueArray: venueI[] = venuesParse(venueFeed);
    console.log(venueArray);
    return {
      venues: venueArray,
    };
  } catch (err) {
    console.log(err);
    return {
      venues: [],
    };
  }
};
