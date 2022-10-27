import { fetchGraphQL } from '../..';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
import { TimeslotResult } from '../../../interfaces/timeslot';

const sessionsQuery = `
query {
  allM_Content_Session (first: 30) {
    results {
      id
      name:content_Name
      isPremium:session_PremiumSession
      description:session_Description
      sessionToMasterAsset:cmpContentToMasterLinkedAsset {
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
      room:session_Room {
        id
        name
      }
      timeslotToSession:session_Timeslot {
        results {
          id
          taxonomyLabel
          sortOrder
        }
      }
      speakers:reference_Session_Speakers_Parents {
        results {
          id
          name:content_Name
        }
      }
      dayToSession:session_Days {
        taxonomyName
        sortOrder
      }
      sessionsTypeToSessions:session_SessionType {
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
  if (sessionResult.room) {
    session.room = sessionResult.room.name;
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

  session.Day = sessionResult.dayToSession.taxonomyName;

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
  results.data.allM_Content_Session.results.forEach((s: SessionResult) => {
    if (s.dayToSession && s.dayToSession.sortOrder == day) {
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
