import { getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Link from "next/link";
import {
  contentHubImageSrcGenerator,
} from "../utilities/contentHubImageLoader";

type BillboardProps = {
  billboards: BillboardResult[];
};

const Home = (props: BillboardProps): JSX.Element => {
  console.table(props);

  return (
    <div className="billboard-list">
      {props.billboards.map((billboard, index) => (
        <div
          key={index}
          className="billboard-item"
          style={{
            backgroundImage:
              "url(" +
              contentHubImageSrcGenerator(billboard.advertisement_Background) +
              ")",
          }}
        >
          <Link href={"/" + billboard.id} passHref>
            {billboard.content_Name}
          </Link>
        </div>
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
