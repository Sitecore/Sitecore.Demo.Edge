import { fetchGraphQL } from "../../../api";
import { Blog } from "../../../interfaces/index";

export const getBlogs = async (
  preview: boolean
): Promise<{ blogs: Blog[] }> => {
  try {
    const blogsQuery: any = `
    query {
      allM_Content_Blog {
        total
        results {
          id
          blog_Title
          blog_Quote
          blog_Body
        }
      }
    }
    `;

    const results: any = await fetchGraphQL(blogsQuery, preview);
    if (results) {
      return {
        blogs: results.data.allM_Content_Blog.results,
      };
    } else {
      return {
        blogs: [
          {
            blog_Title: "Fuel for life: nutrition 101",
            blog_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            blog_Quote: "Beginner",
            id: "1",
          },
          {
            blog_Title: "7 mindset strategies to raise your game",
            blog_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            blog_Quote: "Beginner",
            id: "1",
          },
          {
            blog_Title: "Mountain biking: tales from the trail",
            blog_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            blog_Quote: "Pro",
            id: "1",
          },
          {
            blog_Title: "Train smarter, not harder",
            blog_Body:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
            blog_Quote: "Beginner",
            id: "1",
          },
        ],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      blogs: [],
    };
  }
};
