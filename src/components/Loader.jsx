import ContentLoader from "react-content-loader";

export const GameFilterLoader = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        viewBox="0 0 250 310"
        backgroundColor="#222"
        foregroundColor="#333"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
        <rect x="0" y="60" rx="5" ry="5" width="30%" height="40" />
        <rect x="34%" y="60" rx="5" ry="5" width="66%" height="40" />
        <rect x="0" y="118" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="145" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="172" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="199" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="226" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="273" rx="5" ry="5" width="100%" height="40" />
      </ContentLoader>
    </>
  );
};
