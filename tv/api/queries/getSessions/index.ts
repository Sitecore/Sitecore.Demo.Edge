import { fetchGraphQL } from '../../../api';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { Room } from '../../../interfaces/room';
import { TimeslotResult } from '../../../interfaces/timeslot';
import { DayResult } from '../../../interfaces/day';
import { SpeakerResult } from '../../../interfaces/speaker';

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

export const getSessionsByRoom = async (room: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results?.data?.allDemo_Session?.results &&
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

  results?.data?.allDemo_Session?.results &&
    results.data.allDemo_Session.results.forEach((session: SessionResult) => {
      //TODO: fix the e.id == speaker lookup
      if (
        session.speakers?.results &&
        session.speakers.results.find((speakerResult: SpeakerResult) => speakerResult.id == speaker)
      ) {
        sessions.push(parseSession(session));
      }
    });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};

export const getAllSessionsByDay = async (day: string): Promise<{ sessions: Session[] }> => {
  if (process.env.CI === 'true') {
    return { sessions: [] as Session[] };
  }

  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results?.data?.allDemo_Session?.results &&
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
