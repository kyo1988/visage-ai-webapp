import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const resolvedUrl = ctx.resolvedUrl ?? "/";
  return {
    redirect: {
      destination: "/ja" + resolvedUrl,
      permanent: true,
    },
  };
};

export default function P() {
  return null;
}
