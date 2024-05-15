import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { MEDIA_QUERY } from "@/graphql/queries";

const DetailsCard = () => {
  const router = useRouter();
  const { id } = router.query;
  // console.log("this is the...", id);

  const { loading, error, data } = useQuery(MEDIA_QUERY, {
    variables: {
      id: id,
      type: "ANIME",
      isAdult: false,
      perPage: 1,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const media = data.Page.media[0];

  return (
    <div>
      <img src={media.coverImage.large} alt={media.title.english} />
      <h1>{media.title.english}</h1>
    </div>
  );
};

export default DetailsCard;
