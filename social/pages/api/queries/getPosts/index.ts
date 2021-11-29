import { fetchGraphQL } from "../..";
import { Post } from "../../../../interfaces/index";

const socialContentQuery = `
query {
  allM_Content_SocialMediaMessage {
    results {
      id
      content_Name
      socialMediaMessage_Title
      socialMediaMessage_Body
      socialMediaMessage_Date
      socialMediaMessage_Footer
      content_Brief
      cmpContentToMasterLinkedAsset {
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
      socialMediaMessage_Site {
        id
        taxonomyName
      }
    }
  }
}
`;

interface SocialQueryResult {
  data: {
    allM_Content_SocialMediaMessage: {
      results: Post[];
    };
  };
}

export const getPosts = async (): Promise<{ posts: Post[] }> => {
  try {
    const results = (await fetchGraphQL(
      socialContentQuery
    )) as SocialQueryResult;
    if (results) {
      return {
        posts: results.data.allM_Content_SocialMediaMessage.results,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      posts: [],
    };
  }
};

export const getPostsBySite = async (
  site: string
): Promise<{ posts: Post[] }> => {
  try {
    const results = await getPosts();
    if (results) {
      let facebookPosts: Post[] = results.posts;
      if (site != "") {
        facebookPosts = results.posts.filter(
          (post) => post?.socialMediaMessage_Site?.taxonomyName == site
        );
      }
      return { posts: facebookPosts };
    }
  } catch (err) {
    console.log(err);
    return {
      posts: [],
    };
  }
};
