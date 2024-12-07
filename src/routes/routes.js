import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import UserController from "../controllers/UserController.js";

const router = express.Router();

// Ruta principal
router.get("/", (req, res) => {
  if(req.session) {
    const { user } = req.session;
    res.render("index", {'user': user});
  }else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if(req.session) {
    res.redirect('/');
  }else {
    res.render("login");
  }
});

router.get('logout', (req, res)=>{
  res.clearCookie('access_token')
  req.session = null;
  res.redirect('/login');
});

router.get("/register", (req, res) => {
  if(req.session){
    const { user } = req.session;
    res.redirect('/');
  }else{
    res.render("register");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserController.login(req.body);
    const token = getTokenAccess(user);
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      })
      .end();
  } catch (err) {
    console.error(err);
    res.status(401).end(err.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const id = await UserController.createUser(req.body);
    const token = getTokenAccess(id, req.body);
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      })
      .end();
  } catch (err) {
    console.error(err);
    res.status(400).end(err.message);
  }
});


function getTokenAccess({_id, username, email}) {
  return jwt.sign(
    {
      id: _id,
      user: username,
      email: email,
    },
    process.env.SECRET_JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
}

export default router;
