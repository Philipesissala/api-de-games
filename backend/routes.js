const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");

const games = require("./gamesModel");
const users = require("./userModel");

const jwtSecret = "adjnsdfjnsdfjwoierjoqwerqpwomowkdnfvosdnfowiemoqwdmwpof";

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido!" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "Token inválido" });
  }
}

routes.get("/games", auth, async (req, res) => {
  const HATEOAS = [
    {
      href: "http://localhost:3333/game/0",
      method: "DELETE",
      rel: "delete_game",
    },
    {
      href: "http://localhost:3333/game/0",
      method: "GET",
      rel: "get_game",
    },
    {
      href: "http://localhost:3333/auth",
      method: "POST",
      rel: "login",
    },
  ];

  const data = await games.findAll();
  res.json({ games: data, _links: HATEOAS }).status(200);
});

routes.get("/games/:id", auth, async (req, res) => {
  const id = req.params.id;

  const HATEOAS = [
    {
      href: `http://localhost:3333/game/${id}`,
      method: "DELETE",
      rel: "delete_game",
    },
    {
      href: `http://localhost:3333/game/${id}`,
      method: "PUT",
      rel: "edit_game",
    },
    {
      href: `http://localhost:3333/game/${id}`,
      method: "GET",
      rel: "get_game",
    },
    {
      href: `http://localhost:3333/game/${id}`,
      method: "GET",
      rel: "get_all_games",
    },
  ];

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    if (id !== undefined) {
      const data = await games.findByPk(id);
      res.json({ games: data, _links: HATEOAS }).status(200);
    } else {
      res.sendStatus(404);
    }
  }
});

routes.post("/games", auth, (req, res) => {
  const { title, year, price } = req.body;

  games.create({
    title,
    year,
    price,
  });

  res.json({ message: "Sucess" }).status(200);
});

routes.put("/games/:id", auth, (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    const { title, year, price } = req.body;
    games.update({ title, year, price }, { where: { id } });
    res.json({ message: "Sucess" }).status(200);
  }
});

routes.delete("/games/:id", auth, (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    games.destroy({ where: { id } });
    res.json({ message: "Sucess" }).status(200);
  }
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (email != undefined) {
    const user = await users.findOne({ where: { email } });

    if (user != undefined) {
      if (user.passwod == password) {
        jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret,
          {
            expiresIn: "48h",
          },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
      } else {
        res.status(400);
        res.json({ err: "Credenciais inválidas!" });
      }
    } else {
      res.status(404);
      res.json({ err: "O E-mail enviado não existe na base de dados!" });
    }
  } else {
    res.status(400);
    res.json({ err: "O E-mail enviado é inválido" });
  }
});

module.exports = routes;
