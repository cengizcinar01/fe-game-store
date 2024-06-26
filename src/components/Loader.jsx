import ContentLoader from "react-content-loader";

import styles from "../styles/components/Loader.module.css";

let loaderBackgroundColor = "rgb(23, 23, 23)";
let loaderForegroundColor = "rgb(32, 32, 32)";

export const GameFilterLoader = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        viewBox="0 0 250 310"
        backgroundColor={loaderBackgroundColor}
        foregroundColor={loaderForegroundColor}
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

export const GameListLoader = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        viewBox="0 0 250 380"
        backgroundColor={loaderBackgroundColor}
        foregroundColor={loaderForegroundColor}
      >
        <rect x="0" y="0" rx="5" ry="5" width="100% " height="100%" />
      </ContentLoader>
    </>
  );
};

export const GameDetailsLoader = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        className={styles.loader}
        height={464}
        width="100%"
        backgroundColor={loaderBackgroundColor}
        foregroundColor={loaderForegroundColor}
        backgroundOpacity={0}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100% " height="100%" />
      </ContentLoader>
    </>
  );
};
