import { Blog } from "../interfaces";

type CurrentSessionProps = {
  blog: Blog;
};

const CurrentSession = (props: CurrentSessionProps): JSX.Element => {
  return (
    <div
      className="w-full h-full pt-10"
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(/room-bg.jpg)`,
      }}
    >
      <div className="m-auto p-6">
        <p className="font-semibold py-3 uppercase text-yellow-400">
          Conference Room
        </p>
        <h1 className="text-4xl uppercase text-white">
          {props.blog.blog_Title}
        </h1>
        <p className="text-2xl py-3 font-semibold uppercase text-yellow-400">
          10:00am-11:00am
        </p>
        <p className="text-white pt-2">{props.blog.blog_Body}</p>
      </div>
    </div>
  );
};

export default CurrentSession;
