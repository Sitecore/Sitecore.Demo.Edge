import { fetchGraphQL } from '../..';
import { AllDaysResponse, Day, DayResult } from '../../../interfaces/day';

const daysQuery = `
query {
  allDemo_Day {
    results {
      taxonomyName
      sortOrder
      timeslotToDay {
        results {
          taxonomyLabel
        }
      }
    }
  }
}`;

const parseDay = function (dayResult: DayResult) {
  return {
    name: dayResult.taxonomyName,
    sortOrder: dayResult.sortOrder,
  } as Day;
};

export const getAllDays = async (): Promise<{ days: Day[] }> => {
  const results: AllDaysResponse = (await fetchGraphQL(daysQuery)) as AllDaysResponse;
  const days: Day[] = [];

  results?.data?.allDemo_Day?.results &&
    results.data.allDemo_Day.results.forEach((dayResult: DayResult) => {
      days.push(parseDay(dayResult));
    });

  return { days: days.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)) };
};
