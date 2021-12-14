import { fetchGraphQL } from '../../../api';
import { Session, AllSessionsResponse, SessionResult } from '../../../interfaces/session';
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

  const asset = sessionResult.sessionToMasterAsset.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  session.type =
    sessionResult.sessionsTypeToSessions && sessionResult.sessionsTypeToSessions.taxonomyName;
  session.isPremium = sessionResult.isPremium;
  session.image = `${relativeUrl}?v=${versionHash}`;

  if (sessionResult.room.results.length > 0) {
    session.room = sessionResult.room.results[0].name;
    session.roomId = sessionResult.room.results[0].id;
  }

  if (sessionResult.speakers.results.length > 0) {
    session.speaker = sessionResult.speakers.results[0].name;
  }

  session.Day = sessionResult.dayToSession.results[0].taxonomyName;
  session.ShortDay = sessionResult.dayToSession.results[0].sortOrder;

  if (timeslotResult.id === '' && sessionResult.timeslotToSession.results.length > 0) {
    session.timeslot = sessionResult.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = sessionResult.timeslotToSession.results[0].sortOrder;
  } else {
    session.timeslot = timeslotResult.taxonomyLabel['en-US'];
    session.sortOrder = timeslotResult.sortOrder;
  }

  return session;
};

const formattedSession = function (
  sessionResult: SessionResult,
  day: DayResult,
  time: TimeslotResult
) {
  const session = {} as Session;
  session.id = sessionResult.id;
  session.name = sessionResult.name;

  const asset = sessionResult.sessionToMasterAsset.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  session.type =
    sessionResult.sessionsTypeToSessions && sessionResult.sessionsTypeToSessions.taxonomyName;
  session.isPremium = sessionResult.isPremium;
  session.image = `${relativeUrl}?v=${versionHash}`;

  //Not taking session with multiple rooms into consideration
  if (sessionResult.room.results.length > 0) {
    session.room = sessionResult.room.results[0].name;
    session.roomId = sessionResult.room.results[0].id;
  }

  //Not taking session with multiple speakers into consideration
  if (sessionResult.speakers.results.length > 0) {
    session.speaker = sessionResult.speakers.results[0].name;
  }

  session.Day = day.taxonomyName;
  session.ShortDay = day.sortOrder;

  session.timeslot = time.taxonomyLabel['en-US'];
  session.sortOrder = time.sortOrder;

  return session;
};

const parseAndFilterSession = function (
  sessionResults: SessionResult[],
  filterBy: string,
  filterValue: string
) {
  const sessions: Session[] = [];
  if (sessionResults) {
    let filteredSessions: SessionResult[] = [];
    if (filterBy) {
      if (filterBy == 'room') {
        filteredSessions = sessionResults.filter((sess) => sess.room.results[0].id === filterValue);
      } else if (filterBy == 'speaker') {
        filteredSessions = sessionResults.filter(
          (sess) => sess.speakers.results[0].id === filterValue
        );
      } else if (filterBy == 'day') {
        sessionResults.map((sess) => {
          if (sess.dayToSession.results.length < 2) {
            if (sess.dayToSession.results[0].sortOrder == filterValue.toString()) {
              filteredSessions.push(sess);
            }
          } else {
            sess.dayToSession.results.forEach((daySession) => {
              if (daySession.sortOrder == filterValue) {
                const newSession = sess;
                newSession.dayToSession.results = [daySession];
                filteredSessions.push(sess);
              }
            });
          }
        });
      }
    }
    filteredSessions.forEach((sessionResult: SessionResult) => {
      if (sessionResult.dayToSession.results.length > 1) {
        sessionResult.dayToSession.results.map((dayToSession) => {
          if (sessionResult.timeslotToSession.results.length > 1) {
            sessionResult.timeslotToSession.results.map((tsToSession) => {
              sessions.push(formattedSession(sessionResult, dayToSession, tsToSession));
            });
          } else {
            sessions.push(
              formattedSession(
                sessionResult,
                dayToSession,
                sessionResult.timeslotToSession.results[0]
              )
            );
          }
        });
      } else {
        if (sessionResult.timeslotToSession.results.length > 1) {
          sessionResult.timeslotToSession.results.map((tsToSession) => {
            sessions.push(
              formattedSession(sessionResult, sessionResult.dayToSession.results[0], tsToSession)
            );
          });
        } else {
          sessions.push(
            formattedSession(
              sessionResult,
              sessionResult.dayToSession.results[0],
              sessionResult.timeslotToSession.results[0]
            )
          );
        }
      }
    });
  }

  return sessions;
};

export const getSessionsByRoom = async (room: string): Promise<{ sessions: Session[] }> => {
  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;

  const sessions: Session[] = parseAndFilterSession(
    results.data.allDemo_Session.results,
    'room',
    room
  );

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};

export const getSessionsBySpeaker = async (speaker: string): Promise<{ sessions: Session[] }> => {
  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;
  const sessions: Session[] = [];

  results?.data?.allDemo_Session?.results &&
    results.data.allDemo_Session.results.forEach((session: SessionResult) => {
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
  const results: AllSessionsResponse = (await fetchGraphQL(sessionsQuery)) as AllSessionsResponse;

  const sessions: Session[] = parseAndFilterSession(
    results?.data?.allDemo_Session.results,
    'day',
    day
  );

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};
