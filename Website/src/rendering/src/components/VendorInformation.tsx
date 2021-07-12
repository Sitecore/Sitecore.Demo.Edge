import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VendorInformation = (): JSX.Element => (
  <section className="section">
    <div className="section__content left__content">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-1">
          <img className="border border-gray" src="/assets/img/logo/striva.svg" alt="striva logo" />
          <div>
            <FontAwesomeIcon className="icon" icon={faFacebookF} />
            <FontAwesomeIcon className="icon" icon={faTwitter} />
            <FontAwesomeIcon className="icon" icon={faLinkedinIn} />
            <FontAwesomeIcon className="icon" icon={faInstagram} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue">Striva</h2>
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
        </div>
      </div>
    </div>
  </section>
);

export default VendorInformation;
