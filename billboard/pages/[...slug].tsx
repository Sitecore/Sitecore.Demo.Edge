import { Params } from "../interfaces";
import {
  getBillboardById,
  getBillboardBySlug,
  getBillboards,
} from "../api/queries/getBillboards";
import { BillboardResult } from "../interfaces/schema";
import Image from "next/image";
import { contentHubImageSrcGenerator } from "../utilities/contentHubImageLoader";
import React from "react";
import Navigation from "../components/Navigation";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import defaultLogo from "../public/PLAY-Summit-long-light-grey.svg";
import { normalizeString } from "../utilities/stringConverter";
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
      <span className="text-black">Generate transform</span>
    </Link>
  ) : (
    <></>
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
        <div className={"billboard-container " + title}>
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
          <div className="content-right content-right--half">
            <div className="logo">
              <Image
                src={defaultLogo}
                alt={props.billboard.content_Name}
                height={150}
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
      </div>
      {GeneratorLink}
    </>
  );
}

export async function getStaticPaths() {
  const { billboards } = await getBillboards();

  let slugArray: any[] = [];

  billboards.map((billboard) => {
    billboard?.advertisement_Background?.results?.map((background, index) => {
      slugArray.push([
        normalizeString(billboard.content_Name),
        index.toString(),
      ]);
    });
  });

  const paths = slugArray.map((pageSlug) => ({
    params: { slug: pageSlug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }: BillboardParams) => {
  const { billboard } = await getBillboardBySlug(
    params.slug[0],
    params.slug.length == 2 ? params.slug[1] : "0"
  );

  return {
    props: {
      billboard: billboard,
    },
    revalidate: 10,
  };
};
