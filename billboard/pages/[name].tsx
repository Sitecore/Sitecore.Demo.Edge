import { Params } from "../interfaces";
import {
  getBillboardByName,
  getBillboards,
} from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import {
  contentHubImageSrcGenerator,
  contentHubPublicLinkSrcGenerator,
} from "../utilities/contentHubImageLoader";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Link from "next/link";
import Router from "next/router";
import defaultLogo from "../public/PLAY-Summit-long-light-grey.svg";
import { normalizeString } from "../utilities/helper";
import { showDebugMessage } from "../utilities/debugger";

type BillboardProps = {
  billboard: BillboardResult;
};

export declare type BillboardParams = {
  [param: string]: Params;
};

export default function BillboardPage(props: BillboardProps) {
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";
  const showGeneratorLink = hostname == "localhost";
  const GeneratorLink = showGeneratorLink ? (
    <Link
      href={
        "/generator.html?image=" +
        contentHubImageSrcGenerator(props.billboard.advertisement_Background)
      }
      passHref
    >
      <a className="transformer">🕊</a>
    </Link>
  ) : (
    <></>
  );

  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    function handleCarousel() {
      const slideContainers = document.querySelectorAll(".slider");
      if (slideContainers.length > 0) {
        showDebugMessage("activeSlide = " + activeSlide);
        const newSlide =
          activeSlide + 1 >= slideContainers.length ? 0 : activeSlide + 1;

        setActiveSlide(newSlide);
        for (let i = 0; i < slideContainers.length; i++) {
          slideContainers[i].classList.remove("active");
        }
        if (slideContainers.item) {
          slideContainers.item(activeSlide).classList.add("active");
        }
      }
    }

    const interval = setInterval(handleCarousel, 10000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  const contentVariants = props.billboard.advertisement_Image.results.map(
    (image, index) => {
      return (
        <div
          className={"slider " + (index == 0 ? " active " : " ") + image.style}
          key={index}
        >
          <div className="qrcode">
            <Image
              src={contentHubImageSrcGenerator(
                props.billboard.advertisement_Code
              )}
              alt={props.billboard.content_Name}
              height={150}
              width={150}
            />
          </div>
          <div
            className="image"
            style={{
              backgroundImage:
                "url(" +
                contentHubPublicLinkSrcGenerator(
                  image.assetToPublicLink.results[0]
                ) +
                ")",
            }}
          ></div>
          <div className="content">
            <div className="logo">
              <Image
                src={defaultLogo}
                alt={props.billboard.content_Name}
                height={200}
                width={400}
              />
            </div>
            <div className="slogan">{props.billboard.advertisement_Slogan}</div>
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
      );
    }
  );

  const title = normalizeString(
    props.billboard.advertisement_Background.results[0].title
  );

  return (
    <>
      <Navigation />
      <div className="billboard">
        <div className="image-container" onClick={() => Router.back()}>
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
        <div className={"billboard-container " + title}>{contentVariants}</div>
      </div>
      {GeneratorLink}
    </>
  );
}

export async function getStaticPaths() {
  const { billboards } = await getBillboards();

  const paths = billboards.map((billboard) => ({
    params: { name: normalizeString(billboard.content_Name) },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: BillboardParams) => {
  const { billboard } = await getBillboardByName(params.name);

  return {
    props: {
      billboard: billboard,
    },
    revalidate: 10,
  };
};
