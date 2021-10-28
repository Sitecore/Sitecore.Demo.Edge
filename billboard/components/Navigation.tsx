import Link from "next/link";

const Navigation = (): JSX.Element => {
  return (
    <div className="menu">
      <Link href={"/"} passHref>
        <div className="menu-button">&lt; </div>
      </Link>
    </div>
  );
};

export default Navigation;
