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
    /^micromark.*/,
    /^mdast.*/,
    /^hast.*/,
    /^unist.*/,
    /^vfile.*/,
    /^character-entities.*/,
    "bail",
    "fault",
    "property-information",
    "is-plain-obj",
    "html-void-elements",
    "trough",
    "space-separated-tokens",
    "comma-separated-tokens",
    "ccount",
    "stringify-entities",
    "decode-named-character-reference",
    "markdown-table",
    "trim-lines",
  ],
};
