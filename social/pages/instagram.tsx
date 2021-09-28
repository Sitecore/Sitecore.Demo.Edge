import Head from "next/head";

import LeftSidebar from "../components/twitter/LeftSidebar";
import NewsFeedScreen from "../components/twitter/NewsFeedScreen";
import RightSidebar from "../components/twitter/RightSidebar";
import Navbar from "../components/twitter/Navbar";
import { GetStaticProps } from "next";
import { Post } from "../interfaces/index";
import { getInstagramPosts } from "./api/queries/getInstagramPosts";

type PostProps = {
  posts: Post[];
  preview: boolean;
};

export default function Instagram(props: PostProps) {
  return (
    <div className="body">
      <div className="instagram">
        <div className="header">
          <img
            src="https://image.flaticon.com/icons/svg/25/25315.svg"
            width="8%"
          />
          <img
            src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg"
            width="25%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/20/20402.svg"
            width="8%"
          />
        </div>
        <div className="content">
          <div className="post">
            <div className="name">
              <img
                src="https://randomuser.me/api/portraits/women/84.jpg"
                width="10%"
                height="10%"
                className="profile-img"
              />
              <p>Danielle Pierce</p>
            </div>
            <img
              src="https://image.flaticon.com/icons/svg/149/149947.svg"
              width="5%"
            />
            {/* style="opacity:0.5;"        */}
          </div>
          <div className="post-image">
            <img
              src="https://c1.staticflickr.com/4/3851/14948376317_a97232356c_z.jpg"
              width="100%"
            />
          </div>
          <div className="likes">
            <div className="left-icons">
              <img
                src="https://image.flaticon.com/icons/svg/25/25424.svg"
                width="8%"
              />
              <img
                src="https://image.flaticon.com/icons/svg/54/54916.svg"
                width="8%"
              />
              <img
                src="https://image.flaticon.com/icons/svg/126/126536.svg"
                width="8%"
              />
            </div>
            <img
              src="https://image.flaticon.com/icons/svg/25/25667.svg"
              width="6%"
            />
          </div>
          <div className="like-count">
            <img
              src="https://image.flaticon.com/icons/svg/60/60993.svg"
              width="4%"
            />
            <p>24 likes</p>
          </div>
        </div>
        <div className="footer">
          <img
            src="https://image.flaticon.com/icons/svg/20/20176.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/149/149852.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/25/25668.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/60/60993.svg"
            width="8%"
          />
          <img
            src="https://image.flaticon.com/icons/svg/64/64096.svg"
            width="8%"
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const { posts } = await getInstagramPosts(preview);
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
};
