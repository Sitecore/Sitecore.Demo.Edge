import { fetchGraphQL } from '../../../api';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { RoomResult } from '../../../interfaces/room';

const sessionsQuery = `
query {
  allDemo_Session {
    results {
      id
      name
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
    }
  }
}
`;

const parseSession = function (s: SessionResult) {
  const session = {} as Session;
  session.id = s.id;
  session.name = s.name;

  const asset = s.sessionImage.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  session.image = `${relativeUrl}?v=${versionHash}`;

  if (s.room.results.length > 0) {
    session.room = s.room.results[0].name;
  }

  if (s.speakers.results.length > 0) {
    session.speaker = s.speakers.results[0].name;
  }

  if (s.timeslotToSession.results.length > 0) {
    session.timeslot = s.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = s.timeslotToSession.results[0].sortOrder;
  }

  return session;
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
