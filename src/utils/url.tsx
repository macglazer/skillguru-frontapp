export function isInternalURL(url: string): boolean {
  try {
    if (url.match(/^(http(s)?:)?\/\//)) {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      return hostname === window.location.hostname;
    }

    if (url.startsWith("/")) {
      return true;
    }

    return false;
  } catch (e) {
    console.error("isInternalURL", e);
  }
  return false;
}
