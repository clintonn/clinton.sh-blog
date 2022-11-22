/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    /^unified.*/,
    /^rehype.*/,
    /^remark.*/,
    /^bail.*/,
    /^micromark.*/,
    /^mdast.*/,
    "is-plain-obj",
    "trough",
    "vfile",
    "fault",
    "vfile-message",
    "decode-named-character-reference",
    "unist-util-stringify-position",
    "character-entities",
    "unist-util-visit",
    "zwitch",
    "longest-streak",
    "unist-util-visit-parents",
    "unist-util-is",
  ],
};
