import { venueI } from "../interfaces";

type Props = {
  venues: venueI[];
};

const Venues = ({ venues }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        <ul>
          {venues?.length > 0 ? (
            venues.map((venue, index) => (
              <li key={venue.id}>
                  {venue.name}
                  <br />
                  {venue.description}
                <ul>
                  {venue.rooms.map((room) => (
                    <li key={room.id}>
                      {room.name}
                      <ul>
                        {room.timeslots.map((timeslot) => (
                          <li key={timeslot.id}>{timeslot.name}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            null
          )}
        </ul>
      </div>
    </section>
  );
};

export default Venues;
