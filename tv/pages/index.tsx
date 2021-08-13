import Image from 'next/image';
import banner1 from '../public/banner1.png';
import banner2 from '../public/banner2.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  return (
    <Carousel autoPlay={true} showThumbs={false}>
      <div>
        <Image src={banner1} alt="Sample" />
      </div>
      <div>
        <Image src={banner2} alt="Sample" />
      </div>
    </Carousel>
  );
}
