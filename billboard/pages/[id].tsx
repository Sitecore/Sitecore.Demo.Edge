import { Params } from "../interfaces";
import { getBillboardById, getBillboards } from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import { contentHubImageSrcGenerator } from "../utilities/contentHubImageLoader";
import React from "react";
import Navigation from "../components/Navigation";
import theBillboard from "../public/billboard.png";
import Link from "next/link";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  const customHandleClick = () => {
    var menuButton = document.querySelectorAll(".zoom-menu .menu-button");

    if (menuButton.length < 1) return;
    menuButton[0].classList.toggle("active");

    const billboard = document.getElementsByClassName("billboard-container");
    if (billboard.length < 1) return;
    billboard[0].classList.toggle("active");
  };

  return (
    <>
      <Navigation />
      <div className="menu zoom-menu">
        <div onClick={customHandleClick} className="menu-button"></div>
      </div>

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
        <div className="billboard-frame">
          <Image
            src={theBillboard}
            alt="the billboard"
            width={1000}
            height={900}
            layout={"fixed"}
          ></Image>
        </div>
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

        <div className="cylinder"></div>
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
