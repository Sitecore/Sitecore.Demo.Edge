import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SpeakerInformation = (): JSX.Element => (
  <section className="section">
    <div className="section__content left__content">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <img src="/assets/img/speaker-mary-asada.jpeg" alt="Mary Asada" />
          <div>
            <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faFacebookF} />
            <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faTwitter} />
            <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faLinkedinIn} />
            <FontAwesomeIcon className="icon h-4 m-2 inline text-blue" icon={faInstagram} />
          </div>
          <div className="pt-5">
            <strong>Position:</strong> Lorem Ipsum Dolor
          </div>
          <div className="pt-5">
            <strong>Company:</strong> Lorem Dolor Media
          </div>
          <div className="pt-5">
            <strong>Country:</strong> Canada
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 space-y-5">
          <h3>SPEAKER</h3>
          <h2>Mary Asada</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed.
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. At vero eos et accusam et justo.
          </p>
          <ul className="text-sm pl-10">
            <li>- Lorem ipsum dolor sit amet</li>
            <li>- consetetur sadipscing elitr</li>
            <li>- sed diam nonumy eirmod tempor</li>
            <li>- invidunt ut labore et dolore</li>
            <li>- magna aliquyam erat</li>
            <li>- sed diam voluptua</li>
          </ul>
          <div>
            <div>
              <strong>Talks</strong>
            </div>
            <div className="border border-gray p-5 my-5">
              <p>Mon, 19th | 9:00 AM</p>
              <p className="font-bold">10 Tips to get the most out of your routines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default SpeakerInformation;
