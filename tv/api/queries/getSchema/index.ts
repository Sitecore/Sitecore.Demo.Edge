import { fetchGraphQL } from '../..';
import { DayResult, SchemaResponse, VenueResult } from '../../../interfaces/schema';
import { TimeslotResult } from '../../../interfaces/timeslot';

export const getSchema = async (
  previewApiEnabled: boolean
): Promise<{
  days: DayResult[];
  venues: VenueResult[];
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
      allDemo_Timeslot {
        results {
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
    }
  `;

  const results: SchemaResponse = (await fetchGraphQL(
    schemaQuery,
    previewApiEnabled
  )) as SchemaResponse;

  const days: DayResult[] = results?.data?.allDemo_Day.results;
  const timeslots: TimeslotResult[] = results?.data?.allDemo_Timeslot.results;
  const venues: VenueResult[] = results?.data?.allDemo_Venue.results;

  return {
    days: days?.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)),
    timeslots: timeslots?.sort((a, b) => a.sortOrder - b.sortOrder),
    venues: venues?.sort((c, d) => c.name.localeCompare(d.name)),
  };
};
