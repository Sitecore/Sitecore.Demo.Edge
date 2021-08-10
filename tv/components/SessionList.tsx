import { Blog } from "../interfaces";

type SessionListProps = {
    blogs: Blog[];
  };
  
const SessionList = (props: SessionListProps): JSX.Element => {
    return (
      <div className="sessionList">
        <span className="heading">
          Wednesday, Mar 8
        </span>
  
        {props.blogs.map((name, index) => (
          <div key={index} className="session">
            <div className="time">
              <span>10:00am - 11:00am</span>
            </div>
            <div className="icon">
              <span></span>
            </div>
            <div className="data">
              <span className="title">
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