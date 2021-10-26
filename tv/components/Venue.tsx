import Link from 'next/link';
import { VenueResult } from '../interfaces/schema';

type VenueProps = {
  venue: VenueResult;
};

const Venue = (props: VenueProps): JSX.Element => {
  console.table(props.venue);
  return (
    <>
      {props.venue.rooms && props.venue.rooms.results.length > 0 && (
        <>
          {/* <ul className="absolute p-5 top-10 left-0 z-50 text-black-lightest">
            {props.venue.rooms.results.map((room, index) => (
              <li key={index}>
                <Link href={'/rooms/' + room.id}>{room.name}</Link>
              </li>
            ))}
          </ul> */}

          <div className="roomList">
            <div className="hall-title">{props.venue.name}</div>
            <Link href={'/rooms/' + props.venue.rooms.results[0].id} passHref>
              <div className="tv-one" />
            </Link>
            <Link href={'/rooms/' + props.venue.rooms.results[1].id} passHref>
              <div className="tv-two" />
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Venue;
