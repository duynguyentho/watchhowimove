import {notionDatabaseId, notionToken} from "@helpers/config";
import {DEFAULT_PAGE_SIZE} from "@helpers/constant";
import {ERROR_CODE} from "@helpers/error";
import {Client} from "@notionhq/client";
import axios from "axios";

const notion = new Client({ auth: notionToken });

export const getBlogPosts = async (config: { filter: Record<string, any>; pageSize?: number; nextCursor?: string }) => {
  const databaseId = notionDatabaseId || "";
  const { filter, nextCursor } = config;
  let { pageSize } = config;

  return await notion.databases.query({
    database_id: databaseId,
    filter: filter as any,
    page_size: pageSize || DEFAULT_PAGE_SIZE,
    start_cursor: nextCursor,
  });
};

export const getPage = async (pageId: string) => {
  const data = await axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}?timestamp=${new Date().getTime()}`);

  return data.data;
};

export const getPageBySlug = async (
  slug: string
): Promise<{
  generalInfo: any;
  detailInfo: any;
}> => {

  const posts = await getBlogPosts({
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
    pageSize: 1,
  });

  if (posts.results.length === 0) {
    throw new Error(ERROR_CODE.not_found_the_resource);
  }

  const detailInfo = await getPage(posts.results[0].id)

  //
  // console.log(posts.results[0].id);
  // return detailInfo;
  return {
    generalInfo: posts.results[0],
    detailInfo: detailInfo,
  };
};
