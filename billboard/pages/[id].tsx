import { Params } from "../interfaces";
import {
  getBillboardById,
  getBillboards,
} from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import placeholderImage from "../public/running-alone.jpg";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  return (
    <div className="billboard">
      {/* <Image
            src={placeholderImage}
            layout="fill"
            objectFit="cover"
            alt="background"
          /> */}
      <div className="billboard-container">
        <div className="image-left">
          <Image
            src={placeholderImage}
            layout="fill"
            objectFit="cover"
            alt="Sample"
          />
        </div>
        <div className="content-right">
          <div></div>
          <div>
            {props.billboard.content_Name}
            {/* LOGO here */}
          </div>
          <div>{props.billboard.advertisement_Slogan}</div>
          <div>{props.billboard.advertisement_Eyebrow}</div>
          <div>{props.billboard.advertisement_Title}</div>
          <div>{props.billboard.advertisement_Body}</div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { billboards } = await getBillboards();

  const paths = billboards.map((billboard) => ({
    params: { id: billboard.id },
  }));

  return { paths, fallback: false };
}

// This also gets called at build time
export const getStaticProps = async ({ params }: BillboardParams) => {
  const { billboard } = await getBillboardById(params.id);

  return {
    props: {
      billboard: billboard,
    },
    revalidate: 10,
  };
};
