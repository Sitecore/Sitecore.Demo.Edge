import { fetchGraphQL } from '../..';
import { AllSpeakersResponse, Speaker, SpeakerResult } from '../../../interfaces/speaker';

const parseSpeaker = function (speakerResult: SpeakerResult): Speaker {
  const speaker = { ...speakerResult } as Speaker;
  const asset = speakerResult.speakerToMasterAsset.results[0]?.assetToPublicLink.results[0];
  const relativeUrl = asset?.relativeUrl;
  const versionHash = asset?.versionHash;

  speaker.photo = `${relativeUrl}?v=${versionHash}`;

  return speaker;
};

export const getSpeakers = async (): Promise<{ speakers: Speaker[] }> => {
  const speakersQuery = `
    query {
      allDemo_Speaker(first: 8) {
        results {
          id
          name
          description
          speakerToMasterAsset {
            results {
              id
              fileName
              assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
        }
      }
    }
    `;

  const results: AllSpeakersResponse = (await fetchGraphQL(speakersQuery)) as AllSpeakersResponse;
  const speakers: Speaker[] = [];
  if (results && results.data) {
    for (const speakerResult of results.data.allDemo_Speaker.results) {
      speakers.push(parseSpeaker(speakerResult));
    }

    return { speakers: speakers.sort((a, b) => a.name.localeCompare(b.name)) };
  }
  return { speakers: [] };
};

export const getSpeakerById = async (id: string): Promise<{ speaker: Speaker }> => {
  const speakerByIdQuery = `
    query {
      allDemo_Speaker (where:{id_eq:"${id}"}) {
        results {
          id
          name
          description
          speakerToMasterAsset {
            results {
              id
              fileName
              assetToPublicLink {
                results {
                  id
                  relativeUrl
                  versionHash
                }
              }
            }
          }
        }
      }
    }
    `;

  const results: AllSpeakersResponse = (await fetchGraphQL(
    speakerByIdQuery
  )) as AllSpeakersResponse;
  return {
    speaker: parseSpeaker({ ...results.data.allDemo_Speaker.results[0] }),
  };
};
