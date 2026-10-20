import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  outputFileTracingIncludes: { "/": ["./src/page.html"] },
};
export default nextConfig;
