import { fetchGraphQL } from "../..";
import { Post } from "../../../../interfaces/index";

export const getInstagramPosts = async (
  preview: boolean
): Promise<{ posts: Post[] }> => {
  try {
    const blogsQuery = `
    query {
      allM_Content_SocialMediaMessage {
        results {
          id
          content_Name
          contentTypeToContent {
            id
            contentType_Label
            contentType_Prefix
            __typename
          }
          socialMediaMessage_Title
          socialMediaMessage_Body
          socialMediaMessage_Date
          socialMediaMessage_Footer
          content_Brief
          cmpContentToBriefAsset {
            results {
              id
              fileName
            }
          }
          socialMediaMessage_Site #(where: { taxonomyName_eq: "Facebook" })
          {
            id
            taxonomyName
          }
        }
      }
    }
    `;

    interface BlogsQueryResult {
      data: {
        allM_Content_SocialMediaMessage: {
          results: Post[];
        };
      };
    }

    const results = (await fetchGraphQL(
      blogsQuery,
      preview
    )) as BlogsQueryResult;
    if (results) {
      return {
        posts: results.data.allM_Content_SocialMediaMessage.results,
      };
    } else {
      return {
        posts: [
          {
            socialMediaMessage_Title: "Fuel for life: nutrition 101",
            socialMediaMessage_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            socialMediaMessage_Footer: "Beginner",
            id: "1",
            socialMediaMessage_Date: "01012001",
          },
          {
            socialMediaMessage_Title: "7 mindset strategies to raise your game",
            socialMediaMessage_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            socialMediaMessage_Footer: "Beginner",
            id: "1",
            socialMediaMessage_Date: "01012001",
          },
          {
            socialMediaMessage_Title: "Mountain biking: tales from the trail",
            socialMediaMessage_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            socialMediaMessage_Footer: "Pro",
            id: "1",
            socialMediaMessage_Date: "01012001",
          },
          {
            socialMediaMessage_Title: "Train smarter, not harder",
            socialMediaMessage_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            socialMediaMessage_Footer: "Beginner",
            id: "1",
            socialMediaMessage_Date: "01012001",
          },
        ],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      posts: [],
    };
  }
};
