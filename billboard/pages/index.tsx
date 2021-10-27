import { getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Link from "next/link";

type BillboardProps = {
  billboards: BillboardResult[];
};

const Home = (props: BillboardProps): JSX.Element => {
  return (
    <div>
      {props.billboards.map((billboard, index) => (
        <Link key={index} href={"/billboard/" + billboard.id} passHref>
          <div>{billboard.content_Name}</div>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const { billboards } = await getBillboards();
  return {
    props: {
      billboards: billboards,
    },
    revalidate: 10,
  };
};

export default Home;
