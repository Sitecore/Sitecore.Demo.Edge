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

    return {
      blogs: results.data.allM_Content_Blog.results,
    };
  } catch (err) {
    console.log(err);
    return {
      blogs: [],
    };
  }
};
