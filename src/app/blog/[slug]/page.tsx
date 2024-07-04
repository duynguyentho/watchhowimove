import { FC } from "react";
import PostDetail from "@components/organisms/PostDetail";
import { TNotionBlogPage } from "@models/notion_blog";
import { rootDomain } from "@helpers/config";
import axios from "axios";
import { Metadata } from "next";

type TProps = {
  params: {
    slug: string;
  };
};


export const metadata: Metadata = {
  title: "Notion NextJsssssss",
  description: "Notion NextJs is a starter template for Notion API with NextJs",
  icons: [
    {
      url: process.env.BASE_URL + "/favicon.ico",
    },
  ],
};

const Page: FC<TProps> = async (props: TProps) => {
  const {
    params: { slug },
  } = props;
  let res: {
    result: {
      generalInfo: TNotionBlogPage | null;
      detailInfo: any;
    };
  } = {
    result: {
      generalInfo: null,
      detailInfo: null,
    },
  };
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/blog/${slug}`);
    res = response?.data || '';
  } catch (error) {
    console.error(error);
  }
  if (!res.result || !res.result.generalInfo || !res.result.detailInfo) {
    return <div>Not Found</div>;
  }
  return (
    <div className="pb-4">
      <PostDetail detailInfo={res.result.detailInfo} generalInfo={res.result.generalInfo} />
    </div>
  );
};

export default Page;
