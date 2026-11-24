/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/wallpapers/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] }];
  },
};
