import { getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Link from "next/link";
import {
  contentHubImageLoader,
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
        <Link key={index} href={"/" + billboard.id} passHref>
          <div
            className="flex-1"
            style={{
              backgroundImage:
                "url(" +
                contentHubImageSrcGenerator(
                  billboard.advertisement_Background
                ) +
                ")",
            }}
          >
            {billboard.content_Name}
          </div>
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
