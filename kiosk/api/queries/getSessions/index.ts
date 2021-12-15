import { fetchGraphQL } from '../..';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { TimeslotResult } from '../../../interfaces/timeslot';
import { DayResult } from '../../../interfaces/day';

const sessionsQuery = `
query {
  allDemo_Session (first: 30) {
    results {
      id
      name
      isPremium
      description
      sessionToMasterAsset {
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

      dayToSession {
        results {
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

const parseSession = function (sessionResult: SessionResult) {
  return parseSessionWithTimeSlot(sessionResult, {
    id: '',
    sortOrder: 0,
    taxonomyLabel: {
      'en-US': '',
    },
  });
};

const parseSessionWithTimeSlot = function (
  sessionResult: SessionResult,
  timeslotResult: TimeslotResult
) {
  const session = {} as Session;
  session.id = sessionResult.id;
  session.name = sessionResult.name;
  session.description = sessionResult.description;

  const asset = sessionResult.sessionToMasterAsset.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  session.type =
    sessionResult.sessionsTypeToSessions && sessionResult.sessionsTypeToSessions.taxonomyName;
  session.isPremium = sessionResult.isPremium;
  session.image = `${relativeUrl}?v=${versionHash}`;

  if (sessionResult.room.results.length > 0) {
    session.room = sessionResult.room.results[0].name;
  }

  if (sessionResult.speakers.results.length > 0) {
    session.speaker = sessionResult.speakers.results[0].name;
    if (sessionResult.speakers.results.length > 1) {
      session.speaker = sessionResult.speakers.results
        .map((speaker) => {
          return speaker.name;
        })
        .join(', ');
    }
  }

  session.Day = sessionResult.dayToSession.results[0].taxonomyName;

  if (timeslotResult.id === '' && sessionResult.timeslotToSession.results.length > 0) {
    session.timeslot = sessionResult.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = sessionResult.timeslotToSession.results[0].sortOrder;
  } else {
    session.timeslot = timeslotResult.taxonomyLabel['en-US'];
    session.sortOrder = timeslotResult.sortOrder;
  }

  return session;
};

export const getAllSessionsByDay = async (day: string): Promise<{ sessions: Session[] }> => {
  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results.data.allDemo_Session.results.forEach((s: SessionResult) => {
    if (
      s.dayToSession &&
      s.dayToSession.results &&
      s.dayToSession.results.find((e: DayResult) => e.sortOrder == day)
    ) {
      if (s.timeslotToSession.results.length > 1) {
        s.timeslotToSession.results.map((timedSession) =>
          sessions.push(parseSessionWithTimeSlot(s, timedSession))
        );
      } else {
        sessions.push(parseSession(s));
      }
    }
  });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};
