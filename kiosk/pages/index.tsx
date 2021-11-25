import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/start">
      <a className="h-full w-full absolute z-10"></a>
    </Link>
  );
}
