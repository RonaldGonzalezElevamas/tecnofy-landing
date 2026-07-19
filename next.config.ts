import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
  },
  redirects: async () => [
    { source: "/masajeador", destination: "/producto/masajeador-4d-portatil", permanent: true },
    { source: "/minicamara", destination: "/producto/mini-camara-wifi", permanent: true },
    { source: "/limpiador", destination: "/producto/limpiador-dental-pro", permanent: true },
  ],
};

export default nextConfig;
