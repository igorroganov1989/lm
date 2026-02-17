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
        breadcrumbsProject: [{ title: "Главная", url: "/" }, { title: "Портфолио", url: "/pages/portfolio" }, { title: "Потолочные элементы из ПВС" }],
        breadcrumbsReviews: [{ title: "Главная", url: "/" }, { title: "Отзывы" }],
        breadcrumbsReview: [{ title: "Главная", url: "/" }, { title: "Отзывы", url: "/pages/reviews" }, { title: "Отзыв от Ильи Сафронова " }],
        breadcrumbsPrices: [{ title: "Главная", url: "/" }, { title: "Цены на металлообработку" }],
        breadcrumbsProducion: [{ title: "Главная", url: "/" }, { title: "Производство изделий из металла" }],
        breadcrumbsProducionDetails: [
          { title: "Главная", url: "/" },
          { title: "Производство изделий из металла", url: "/pages/production" },
          { title: "Корзины для кондиционера" },
        ],
        breadcrumbsArticle: [{ title: "Главная", url: "/" }, { title: "Статьи" }],
        projectImages: ["/images/project1.png", "/images/portfolio2.png", "/images/portfolio3.png", "/images/portfolio4.png"],
        projectText: [
          "Изделия из просечно-вытяжной сетки – пожалуй самое недооцененное декоративное решение в России. Зарубежные архитекторы и дизайнеры достаточно давно используют эту технологию для того, чтобы прикрыть технические зоны, разнообразить фасад или как в этом примере не использовать стандартные панели «Армстронг». Помимо всех других преимуществ, изделия из ПВС достаточно демократичны в цене и выглядят намного дороже стоимости.",
          "На примере этого проекта можно убедиться, что с помощью умелого применения цвета и сочетания элементов сделать намного более светлое и свежее пространство, в котором приятно находится и работать. Мы всегда рады работать с архитекторами, которые не боятся нестандартных решений.",
        ],
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
