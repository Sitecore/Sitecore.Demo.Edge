import Link from "next/link";

const Navigation = (): JSX.Element => {
  return (
    <div className="menu">
      <Link href={"/"} passHref>
        <div className="menu-button">
          <div className="inactive">ⓘ</div>
          <div className="active">
            Click anywhere outside the billboard to go back. <br />
            If the placement of the billboard does not look correct <br />
            please contact the demo team.
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
