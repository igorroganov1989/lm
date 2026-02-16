import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: "src",
  base: "./",

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/components"),
      context: {
        breadcrumbsAbout: [{ title: "Главная", url: "/" }, { title: "О компании" }],
        breadcrumbsPortfolio: [{ title: "Главная", url: "/" }, { title: "Портфолио" }],
      },
    }),

    {
      name: "watch-handlebars-components",
      handleHotUpdate({ file, server }) {
        if (file.includes("/components/")) {
          server.ws.send({
            type: "full-reload",
          });
        }
      },
    },
  ],

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/pages/About.html"),
        404: resolve(__dirname, "src/pages/404.html"),
      },
      output: {
        entryFileNames: "scripts/main.min.js",
        chunkFileNames: "scripts/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".css")) return "css/style.min.css";
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) return "images/[name][extname]";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) return "fonts/[name][extname]";
          return "assets/[name][extname]";
        },
      },
    },
  },
});
