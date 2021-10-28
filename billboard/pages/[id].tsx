import { Params } from "../interfaces";
import { getBillboardById, getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import {
  contentHubImageSrcGenerator,
} from "../utilities/contentHubImageLoader";
import React from "react";
import Navigation from "../components/Navigation";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  return (
    <>
      <Navigation />
      <div
        className="billboard"
        style={{
          backgroundImage:
            "url(" +
            contentHubImageSrcGenerator(
              props.billboard.advertisement_Background
            ) +
            ")",
        }}
      >
        <div className="billboard-container zoomed">
          <div
            className="image-left"
            style={{
              backgroundImage:
                "url(" +
                contentHubImageSrcGenerator(
                  props.billboard.advertisement_Image
                ) +
                ")",
            }}
          ></div>
          <div className="content-right">
            <div className="logo">
              <Image
                src={contentHubImageSrcGenerator(
                  props.billboard.advertisement_Logo
                )}
                alt={props.billboard.content_Name}
                height={150}
                width={400}
              />
            </div>
            <div className="slogan">{props.billboard.advertisement_Slogan}</div>
            <div className="eyebrow">
              {props.billboard.advertisement_Eyebrow}
            </div>
            <div className="title">{props.billboard.advertisement_Title}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: props.billboard.advertisement_Body,
              }}
              className="body"
            ></div>
          </div>
        </div>
      </div>
    </>
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
