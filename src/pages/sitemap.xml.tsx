import { GetServerSidePropsContext } from 'next';
import { generateSitemapXml } from 'lib/generateSitemapXml'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;