//import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import dynamic from "next/dynamic";


const DynamicNavBar = dynamic(
  () => import('../components/NavBar'),
  { ssr: false }
)

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
      <DynamicNavBar />
      <div>Hello World</div>
      {!data ? null: data.posts.map((p) => <div key={p.id}>{p.id}{p.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
