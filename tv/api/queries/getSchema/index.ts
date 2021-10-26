import { fetchGraphQL } from '../..';
import { DayResult, SchemaResponse } from '../../../interfaces/schema';

export const getSchema = async (): Promise<{ days: DayResult[] }> => {
  const schemaQuery = `
  query {
    allDemo_Day(first: 30) {
      results {
        taxonomyName
        sortOrder
        timeslotToDay {
          results {
              id
              sortOrder
              taxonomyLabel
          }
        }
      }
    }
    allDemo_Venue(first: 30) {
      results {
        name
        rooms(first: 30) {
          results {
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
    return { days: [] as DayResult[] };
  }

  const results: SchemaResponse = (await fetchGraphQL(schemaQuery)) as SchemaResponse;

  const days: DayResult[] = results.data.allDemo_Day.results;

  return { days: days.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)) };
};
