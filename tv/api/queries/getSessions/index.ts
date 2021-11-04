import { fetchGraphQL } from '../../../api';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { Room } from '../../../interfaces/room';
import { TimeslotResult } from '../../../interfaces/timeslot';
import { AllDaysResponse, Day, DayResult } from '../../../interfaces/day';

const sessionsQuery = `
query {
  allDemo_Session (first: 30) {
    results {
      id
      name
      isPremium

      sessionImage {
        results {
          assetToPublicLink(first: 1) {
            results {
              id
              relativeUrl
              versionHash
            }
          }
        }
      }

      room {
        results {
          id
          name
        }
      }

      timeslotToSession {
        results {
          id
          taxonomyLabel
          sortOrder
        }
      }

      speakers {
        results {
          id
          name
        }
      }

      dayToSession{
        results{
          taxonomyName
          sortOrder
        }
      }

      sessionsTypeToSessions {
        taxonomyName
      }

    }
  }
}
`;

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

const parseSession = function (s: SessionResult) {
  return parseSessionWithTimeSlot(s, {
    id: '',
    sortOrder: 0,
    taxonomyLabel: {
      'en-US': '',
    },
  });
};

const parseSessionWithTimeSlot = function (s: SessionResult, ts: TimeslotResult) {
  const session = {} as Session;
  session.id = s.id;
  session.name = s.name;

  const asset = s.sessionImage.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  session.type = s.sessionsTypeToSessions && s.sessionsTypeToSessions?.taxonomyName;
  session.isPremium = s.isPremium;
  session.image = `${relativeUrl}?v=${versionHash}`;

  if (s.room.results.length > 0) {
    session.room = s.room.results[0].name;
  }

  if (s.speakers.results.length > 0) {
    session.speaker = s.speakers.results[0].name;
  }

  session.Day = s.dayToSession.results[0].taxonomyName;

  if (ts.id == '' && s.timeslotToSession.results.length > 0) {
    session.timeslot = s.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = s.timeslotToSession.results[0].sortOrder;
  } else {
    session.timeslot = ts.taxonomyLabel['en-US'];
    session.sortOrder = ts.sortOrder;
  }

  return session;
};

const parseDay = function (s: DayResult) {
  const day = {} as Day;
  day.name = s.taxonomyName;
  day.sortOrder = s.sortOrder;
  day.timeslots = s.timeslotToDay.results.map((ts) => ({
    taxonomyLabel: ts.taxonomyLabel['en-US'],
  }));
  return day;
};

export const getSessionsByRoom = async (room: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results &&
    results.data &&
    results.data.allDemo_Session.results.forEach((s: SessionResult) => {
      if (s.room && s.room.results && s.room.results.find((e: Room) => e.id == room)) {
        sessions.push(parseSession(s));
      }
    });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};

export const getSessionsBySpeaker = async (speaker: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results &&
    results.data &&
    results.data.allDemo_Session.results.forEach((s: SessionResult) => {
      //TODO: fix the e.id == speaker lookup
      if (
        s.speakers &&
        s.speakers.results &&
        s.speakers.results.find((e: Room) => e.id == speaker)
      ) {
        sessions.push(parseSession(s));
      }
    });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};

export const GetAllDays = async (): Promise<{ days: Day[] }> => {
  if (process.env.CI === 'true') {
    return { days: [] as Day[] };
  }
  const results: AllDaysResponse = (await fetchGraphQL(daysQuery)) as AllDaysResponse;
  const days: Day[] = [];

  results &&
    results.data &&
    results.data.allDemo_Day.results.forEach((s: DayResult) => {
      days.push(parseDay(s));
    });

  return { days: days.sort((a, b) => parseInt(a.sortOrder) - parseInt(b.sortOrder)) };
};

export const getAllSessionsByDay = async (day: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results &&
    results.data &&
    results.data.allDemo_Session.results.forEach((s: SessionResult) => {
      if (
        s.dayToSession &&
        s.dayToSession.results &&
        s.dayToSession.results.find((e: DayResult) => e.sortOrder == day)
      ) {
        if (s.timeslotToSession.results) {
          s.timeslotToSession.results.map((ts) => {
            sessions.push(parseSessionWithTimeSlot(s, ts));
          });
        }
      }
    });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};
