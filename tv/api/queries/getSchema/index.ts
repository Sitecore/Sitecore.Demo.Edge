import { fetchGraphQL, useGraphQL } from '../..';
import { useContext, useEffect, useState } from 'react';
import { DayResult, SchemaResponse, VenueResult } from '../../../interfaces/schema';
import { TimeslotResult } from '../../../interfaces/timeslot';

export function useSchema() {
  const schemaQuery = `
  query {
    allDemo_Day {
      results {
        taxonomyName
        sortOrder
      }
    }
    allDemo_Timeslot {
      results {
        sortOrder
        taxonomyLabel
      }
    }
    allDemo_Venue {
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

  const { status, data } = useGraphQL(schemaQuery);
  const [graphQLSchema, setSchema] = useState({});
  const [graphQLSchemaStatus, setStatus] = useState('idle');

  useEffect(() => {

    const parseData = async () => {
      console.log('status: ', status);

      if (status !== 'fetched') return;
      const results = data as SchemaResponse;

      const days: DayResult[] = results?.data?.allDemo_Day.results;
      const timeslots: TimeslotResult[] = results?.data?.allDemo_Timeslot.results;
      const venues: VenueResult[] = results?.data?.allDemo_Venue.results;
      
      setSchema( {
        days: days?.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)),
        timeslots: timeslots?.sort((a, b) => a.sortOrder - b.sortOrder),
        venues: venues?.sort((c, d) => c.name.localeCompare(d.name)),
      })
      setStatus('fetched');

      console.log('Set: ', graphQLSchema);
    };

    parseData();
  }, [status]);

  return {graphQLSchemaStatus, graphQLSchema};
}

export const getSchema = async (
  previewApiEnabled: boolean
): Promise<{
  days: DayResult[];
  venues: VenueResult[];
  timeslots: TimeslotResult[];
}> => {
  const schemaQuery = `
    query {
      allDemo_Day {
        results {
          taxonomyName
          sortOrder
        }
      }
      allDemo_Timeslot {
        results {
          sortOrder
          taxonomyLabel
        }
      }
      allDemo_Venue {
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
