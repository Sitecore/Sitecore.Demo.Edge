import { fetchGraphQL } from '../../../api';
import {
  Session,
  SessionResult,
  SessionsByDayResponse,
  SessionsByRoomResponse,
} from '../../../interfaces/session';
import { TimeslotResult } from '../../../interfaces/timeslot';
import { DayResult } from '../../../interfaces/day';
import { Room } from '../../../interfaces/room';

const formattedSession = function (
  sessionResult: SessionResult,
  day: DayResult | null,
  time: TimeslotResult | null,
  room: Room | null,
  includeSpeakers: boolean
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

  if (includeSpeakers && sessionResult.speakers.results.length > 0) {
    session.speaker = sessionResult.speakers.results[0].name;
    if (sessionResult.speakers.results.length > 1) {
      session.speaker = sessionResult.speakers.results
        .map((speaker) => {
          return speaker.name;
        })
        .slice(0, 2)
        .join(', ');
    }
  }
  //Not taking session with multiple rooms into consideration
  if (room != null) {
    session.roomId = room.id;
    session.room = room.name;
  } else if (sessionResult?.room?.results?.length > 0) {
    session.roomId = sessionResult.room.results[0].id;
    session.room = sessionResult.room.results[0]?.name;
  }

  if (day != null) {
    session.day = day.taxonomyName;
    session.shortDay = day.sortOrder;
  } else if (sessionResult?.dayToSession?.results?.length > 0) {
    session.shortDay = sessionResult.dayToSession.results[0].sortOrder;
    session.day = sessionResult.dayToSession.results[0]?.taxonomyName;
  }

  if (time != null) {
    session.timeslot = time.taxonomyLabel['en-US'];
    session.sortOrder = time.sortOrder;
  } else if (sessionResult?.timeslotToSession?.results?.length > 0) {
    session.timeslot = sessionResult.timeslotToSession.results[0].taxonomyLabel['en-US'];
    session.sortOrder = sessionResult.timeslotToSession.results[0]?.sortOrder;
  }

  return session;
};

export const getSessionsByRoom = async (
  room: string,
  day: number
): Promise<{ sessions: Session[]; room: Room }> => {
  const SessionByRoomQuery = `
  query {
    allDemo_Room(where: { id_eq: "${room}" }) {
      results {
        id
        name
        venue:rooms{
          name
        }
        session: room {
          results {
            id
            name
            isPremium
            sessionToMasterAsset {
              results {
                assetToPublicLink(first: 1) {
                  results {
                    relativeUrl
                    versionHash
                  }
                }
              }
            }
            dayToSession {
              results {
                taxonomyName
                sortOrder
              }
            }
            timeslotToSession {
              results {
                taxonomyLabel
                sortOrder
              }
            }
            sessionsTypeToSessions {
              taxonomyName
            }
            speakers{
              results{
                name
              }
            }
          }
        }
      }
    }
  }
  `;

  const results: SessionsByRoomResponse = (await fetchGraphQL(
    SessionByRoomQuery
  )) as SessionsByRoomResponse;

  const currentRoom: Room = {
    id: results?.data?.allDemo_Room.results[0].id,
    name: results?.data?.allDemo_Room.results[0].name,
    venue: results?.data?.allDemo_Room.results[0].venue,
  };

  const currentDay: DayResult = {
    taxonomyName: 'Day ' + (day + 1).toString(),
    sortOrder: day.toString(),
  };

  const sessions: Session[] = [];
  results?.data?.allDemo_Room.results[0].session.results.map((sessionData) => {
    sessionData.timeslotToSession.results.map((ts) => {
      const sessionIsToday = sessionData?.dayToSession?.results?.some((sessionDay) => {
        return sessionDay.sortOrder == day.toString();
      });

      if (sessionIsToday) {
        sessions.push(formattedSession(sessionData, currentDay, ts, currentRoom, true));
      }
    });
  });

  return {
    sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder),
    room: currentRoom,
  };
};

export const getSessionsByDay = async (day: number): Promise<{ sessions: Session[] }> => {
  const sessionsByDayQuery = `
  query {
    allDemo_Day(where: { sortOrder_eq: ${day} }) {
      results {
        sortOrder
        taxonomyName
        dayToSession {
          results {
            id
            name
            isPremium
            sessionToMasterAsset {
              results {
                assetToPublicLink(first: 1) {
                  results {
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
                taxonomyLabel
                sortOrder
              }
            }
            sessionsTypeToSessions {
              taxonomyName
            }
            speakers{
              results{
                name
              }
            }
          }
        }
      }
    }
  }
  `;

  const results: SessionsByDayResponse = (await fetchGraphQL(
    sessionsByDayQuery
  )) as SessionsByDayResponse;

  const currentDay: DayResult = {
    sortOrder: results?.data?.allDemo_Day.results[0].sortOrder,
    taxonomyName: results?.data?.allDemo_Day.results[0].taxonomyName,
  };

  const sessions: Session[] = [];
  results?.data?.allDemo_Day.results[0].dayToSession.results.map((sessionData) => {
    sessionData.timeslotToSession.results.map((ts) => {
      sessions.push(formattedSession(sessionData, currentDay, ts, null, false));
    });
  });

  return { sessions: sessions.sort((a, b) => a.sortOrder - b.sortOrder) };
};
