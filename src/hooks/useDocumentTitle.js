import { useEffect } from "react";

const SITE_NAME = "NepalWill";
const DEFAULT_TITLE = `${SITE_NAME} | Empowering young minds in Nepal`;

/**
 * Set document.title to "<title> | NepalWill". Pass a falsy title while data is loading
 * (or on the home page) to get the default site title.
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  }, [title]);
}
