import Link from 'next/link';
import { VenueResult } from '../interfaces/schema';

type VenueProps = {
  venue: VenueResult;
};

const Venue = (props: VenueProps): JSX.Element => {
  return (
    <>
      {props.venue.rooms && props.venue.rooms.results.length > 0 && (
        <div className="roomList">
          <div className="hall-title">{props.venue.name}</div>
          <Link href={'/rooms/' + props.venue.rooms.results[0].id} passHref>
            <div className="tv-one" />
          </Link>
          <Link href={'/rooms/' + props.venue.rooms.results[1].id} passHref>
            <div className="tv-two" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Venue;
