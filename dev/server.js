import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

import webpackConfig from "../webpack.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const compiler = webpack({ ...webpackConfig, mode: "development" });

app.use(express.json());

// serves the freshly compiled /loco-model.mjs from memory, rebuilt on every src/ change
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }),
);

// dev/index.html at "/", dev/index.js at "/index.js"
app.use(express.static(__dirname));

let articles = [
  { id: 1, title: "Loco is tiny", published_at: "2026-01-15T10:00:00Z" },
  { id: 2, title: "Models over views", published_at: "2026-02-20T10:00:00Z" },
  { id: 3, title: "Pagination is free", published_at: "2026-03-05T10:00:00Z" },
  { id: 4, title: "Validate locally", published_at: "2026-04-11T10:00:00Z" },
  { id: 5, title: "Identity map", published_at: "2026-05-30T10:00:00Z" },
];
let nextId = 6;

const PER_PAGE = 2;

app.get("/articles", (req, res) => {
  const page = parseInt(req.query.page || 1, 10);
  console.log(`GET /articles page=${page}`);
  res.json({
    resources: articles.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    count: articles.length,
  });
});

app.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => String(a.id) === req.params.id);
  if (!article) return res.status(404).json({});
  res.json(article);
});

app.post("/articles", (req, res) => {
  const { title } = req.body.article ?? {};
  if (!title) {
    return res.json({ success: false, errors: { title: ["can't be blank"] } });
  }
  const article = { id: nextId++, title, published_at: new Date() };
  articles.push(article);
  res.json({ success: true, id: article.id });
});

app.put("/articles/:id", (req, res) => {
  const article = articles.find((a) => String(a.id) === req.params.id);
  if (!article) return res.status(404).json({ success: false });
  Object.assign(article, req.body.article ?? {});
  res.json({ success: true });
});

app.delete("/articles/:id", (req, res) => {
  articles = articles.filter((a) => String(a.id) !== req.params.id);
  res.json({ success: true });
});

app.listen(4000, () => {
  console.log("Playground listening on http://localhost:4000\n");
});
