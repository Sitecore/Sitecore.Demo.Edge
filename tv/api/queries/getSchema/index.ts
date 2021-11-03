import { fetchGraphQL } from '../..';
import { DayResult, SchemaResponse, VenueResult } from '../../../interfaces/schema';
import { TimeslotResult } from '../../../interfaces/session';
import { SpeakerResult } from '../../../interfaces/speaker';

export const getSchema = async (): Promise<{
  days: DayResult[];
  venues: VenueResult[];
  speakers: SpeakerResult[];
  timeslots: TimeslotResult[];
}> => {
  const schemaQuery = `
    query {
      allDemo_Day(first: 30) {
        results {
          taxonomyName
          sortOrder
        }
      }
      allDemo_Timeslot{
        results{
          id
          sortOrder
          taxonomyLabel
        }
      }
      allDemo_Venue(first: 30) {
        results {
          id
          name
          rooms(first: 30) {
            results {
              id
              name
            }
          }
        }
      }
      allDemo_Speaker(first: 30) {
        results {
          id
          name
          description
          image {
            results {
              id
              fileName
              assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
        }
      }
    }
  `;

  if (process.env.CI === 'true') {
    return {
      days: [] as DayResult[],
      timeslots: [] as TimeslotResult[],
      venues: [] as VenueResult[],
      speakers: [] as SpeakerResult[],
    };
  }

  const results: SchemaResponse = (await fetchGraphQL(schemaQuery)) as SchemaResponse;

  const days: DayResult[] = results.data.allDemo_Day.results;
  const timeslots: TimeslotResult[] = results.data.allDemo_Timeslot.results;
  const venues: VenueResult[] = results.data.allDemo_Venue.results;
  const speakers: SpeakerResult[] = results.data.allDemo_Speaker.results;

  return {
    days: days.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)),
    timeslots: timeslots.sort((a, b) => a.sortOrder - b.sortOrder),
    venues: venues.sort((c, d) => c.name.localeCompare(d.name)),
    speakers: speakers.sort((e, f) => e.name.localeCompare(f.name)),
  };
};
