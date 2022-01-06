import { getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Link from "next/link";
import { contentHubImageSrcGenerator } from "../utilities/contentHubImageLoader";
import defaultBillboard from "../public/billboard-frame.png";
import defaultBackground from "../public/mountain-bg.jpg";
import defaultLogo from "../public/favicon.ico";
import Image from "next/image";

type BillboardProps = {
  billboards: BillboardResult[];
};

const Home = (props: BillboardProps): JSX.Element => {
  console.log(props);

  const billboardList =
    props.billboards.length > 0 ? (
      <div className="billboard-list">
        {props.billboards.map((billboard, index) => (
          <div
            key={index}
            className="billboard-item"
            style={{
              backgroundImage:
                "url(" +
                contentHubImageSrcGenerator(billboard.advertisement_Image) +
                ")",
            }}
          >
            {billboard.advertisement_Background.results.length > 1 ? (
              <>
                <div className="billboard-title">{billboard.content_Name}</div>
                <div className="billboard-variants">
                  {billboard.advertisement_Background.results.map(
                    (background, ind) => (
                      <Link
                        key={ind}
                        href={"/" + billboard.content_Name + "?bg=" + ind}
                        passHref
                      >
                        <a>Variant {ind + 1}</a>
                      </Link>
                    )
                  )}
                </div>
              </>
            ) : (
              <Link href={"/" + billboard.content_Name + "?bg=0"} passHref>
                <a className="billboard-title">{billboard.content_Name}</a>
              </Link>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="billboard">
        <div className="image-container">
          <Image
            alt="background"
            src={defaultBackground}
            className="billboard-background"
            width={2000}
            height={1200}
            layout={"fixed"}
          />
        </div>
        <div className="billboard-frame">
          <Image
            src={defaultBillboard}
            alt="the billboard"
            width={1000}
            height={900}
            layout={"fixed"}
          ></Image>
          <div className="billboard-container">
            <div
              className="image-left"
              style={{
                backgroundImage: "url()",
              }}
            ></div>
            <div className="content-right">
              <div className="logo my-10">
                <Image src={defaultLogo} alt="logo" height={50} width={50} />
              </div>
              <div className="slogan">Something went wrong</div>
              <div className="body">
                - Could not connect to Content Hub
                <br />
                - Could not find any billboard content
                <br />
                - The internet is going down
                <br />
                - Your computer is not on
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return billboardList;
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
