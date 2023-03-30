module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["api.openpix.com.br"],
  },
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
      artifactDirectory: "./__generated__",
    },
  },
};
