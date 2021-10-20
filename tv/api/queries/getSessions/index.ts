import { fetchGraphQL } from '../../../api';
import {
  Session,
  Day,
  AllSessionsResponse,
  SessionResult,
  AllDaysResponse,
  DayResult,
} from '../../../interfaces/session';
import { RoomResult } from '../../../interfaces/room';

const sessionsQuery = `
query {
  allDemo_Session (first: 30) {
    results {
      id
      name
      isPremium

      sessionImage {
        results {
          id
          fileName
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
  return parseSessionWidthDay(s, '');
};

const parseSessionWidthDay = function (s: SessionResult, d: string) {
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

  session.Day = d != '' ? d : s.dayToSession.results[0].taxonomyName;

  if (s.timeslotToSession.results.length > 0) {
    session.timeslot = s.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = s.timeslotToSession.results[0].sortOrder;
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

  results.data.allDemo_Session.results.forEach((s: SessionResult) => {
    if (s.room && s.room.results && s.room.results.find((e: RoomResult) => e.id == room)) {
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

  results.data.allDemo_Session.results.forEach((s: SessionResult) => {
    //TODO: fix the e.id == speaker lookup
    if (
      s.speakers &&
      s.speakers.results &&
      s.speakers.results.find((e: RoomResult) => e.id == speaker)
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

  results.data.allDemo_Day.results.forEach((s: DayResult) => {
    days.push(parseDay(s));
  });

  return { days: days.sort((a, b) => b.sortOrder - a.sortOrder) };
};

export const getAllSessionsByDay = async (day: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results.data.allDemo_Session.results.forEach((s: SessionResult) => {
    if (
      s.dayToSession &&
      s.dayToSession.results &&
      s.dayToSession.results.find((e: DayResult) => e.taxonomyName == day)
    ) {
      sessions.push(parseSession(s));
    }
  });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};

export const getAllSessionsSortedByDay = async (): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results.data.allDemo_Session.results.forEach((s: SessionResult) => {
    if (s.dayToSession && s.dayToSession.results) {
      s.dayToSession.results.map((d) => {
        sessions.push(parseSessionWidthDay(s, d.taxonomyName));
      });
    }
  });

  return {
    sessions: sessions
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .sort((a, b) => a.Day.localeCompare(b.Day)),
  };
};
