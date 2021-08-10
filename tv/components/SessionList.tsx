import { Blog } from "../interfaces";

type SessionListProps = {
    blogs: Blog[];
  };
  
const SessionList = (props: SessionListProps): JSX.Element => {
    return (
      <div>
        <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest pb-6">
          Wednesday, Mar 8
        </span>
  
        {props.blogs.map((name, index) => (
          <div key={index} className="flex mb-4">
            <div className="w-3/12">
              <span className="text-sm text-gray-600 block">10:00am - 11:00am</span>
            </div>
            <div className="w-1/12">
              <span className="bg-red-400 h-2 w-2 rounded-full block mt-2"></span>
            </div>
            <div className="w-8/12">
              <span className="text-sm font-semibold block">
                {name.blog_Title}
              </span>
              <span className="text-sm">{name.blog_Quote}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default SessionList;