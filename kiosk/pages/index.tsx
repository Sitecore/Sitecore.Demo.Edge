import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div
      className="h-screen w-screen"
      onClick={() => (window.location.href = '/start')}
    ></div>
  );
}
