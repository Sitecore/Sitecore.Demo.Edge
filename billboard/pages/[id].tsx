import { Params } from "../interfaces";
import { getBillboardById, getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import { contentHubImageSrcGenerator } from "../utilities/contentHubImageLoader";
import React from "react";
import Navigation from "../components/Navigation";
import theBillboard1 from "../public/billboard-frame.png";
import theBillboard2 from "../public/billbaord2.png";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  //4bwwmhx1jU2duqmDcxD0Qg mountain billboard
  //Ob6bc7hS40SsfCLf7KP9kg ocean billboard
  const billboardFrame =
    props.billboard.id == "Ob6bc7hS40SsfCLf7KP9kg" ||
    props.billboard.id == "0000" ? (
      <Image
        src={theBillboard2}
        alt="the billboard"
        width={1000}
        height={900}
        layout={"fixed"}
      ></Image>
    ) : (
      <Image
        src={theBillboard1}
        alt="the billboard"
        width={1000}
        height={900}
        layout={"fixed"}
      ></Image>
    );

  return (
    <>
      <Navigation />
      <div className="billboard">
        <div className="image-container">
          <Image
            src={contentHubImageSrcGenerator(
              props.billboard.advertisement_Background
            )}
            alt={props.billboard.content_Name}
            className="billboard-background"
            width={2000}
            height={1200}
            layout={"fixed"}
          />
        </div>
        <div className={"billboard-frame " + props.billboard.id}>
          {billboardFrame}
          <div className="billboard-container">
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
              <div className="slogan">
                {props.billboard.advertisement_Slogan}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.billboard.advertisement_Eyebrow,
                }}
                className="eyebrow"
              ></div>
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

export const getStaticProps = async ({ params }: BillboardParams) => {
  const { billboard } = await getBillboardById(params.id);

  return {
    props: {
      billboard: billboard,
    },
    revalidate: 10,
  };
};
