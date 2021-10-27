import { Params } from "../../interfaces";
import {
  getBillboardById,
  getBillboards,
} from "../../api/queries/getBillboards";
import { BillboardResult } from "../../interfaces/schema";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  return (
    <div id="container">
      <div id="monitor">
        <div id="monitorscreen">
          {props.billboard.content_Name}
          {props.billboard.advertisement_Title}
          {props.billboard.advertisement_Body}
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
