import { Post } from "../interfaces";

type RoomProps = {
  posts: Post[];
};

const RoomDisplay = (props: RoomProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-gray-100 p-10">
        <div className="mb-auto mt-auto max-w-lg">
          <h1 className="text-6xl uppercase pb-10 text-center">10:02AM</h1>
          <h1 className="text-xl uppercase">Today</h1>
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
