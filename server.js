const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", (req, res) => {
  const about = {
    avatar_url:
      "https://avatars1.githubusercontent.com/u/38964840?s=460&u=d2252c0eff05c0af5dbd8c3944b5a3eaaed5f84c&v=4",
    name: "Wallison Moura",
    role: "Desenvolvedor de Sistema",
    description:
      "Graduado em Análise e Desenvolvimento de Sistemas. Apaixonado por tecnologia.",
    links: [
      { name: "Github", url: "https://github.com/wallisonmoura" },
      { name: "Instagram", url: "https://www.instagram.com/wallison.moura/" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/wallison-moura" },
    ],
  };
  return res.render("about", { about });
});

server.get("/aulas", (req, res) => {
  return res.render("aulas", { items: videos });
});

server.get("/video", (req, res) => {
  const id = req.query.id;

  const video = videos.find((video) => {
    return video.id === id;
  });

  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { item: video });
});

server.listen(3000, () => {
  console.log("Servidor rodando");
});
