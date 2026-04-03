import { useRouter } from "next/router";

const CategoryPage = () => {
  const { query } = useRouter();
  const slugs = Array.isArray(query.slug)
    ? query.slug
    : query.slug
    ? [query.slug]
    : [];

  return (
    <div>
      <h1>Category Page</h1>
      <ul>
        {slugs.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
