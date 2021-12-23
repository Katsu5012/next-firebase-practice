import type { NextApiRequest as Req, NextApiResponse as Res } from "next";

import { setCookie } from "nookies";
import { firebaseAdmin } from "../../firebaseAdmin"; // 上記で実装したファイル

export default async function sessionApi(req: Req, res: Res) {
  // "POST"以外は、"404 Not Found"を返す
  if (req.method !== "POST") return res.status(404).send("Not Found");

  const auth = firebaseAdmin.auth();
  // Tokenの有効期限
  //   const expiresIn =5分
  const idTokenExpiresIn = 60 * 5 * 1000;
  const refreshTokenExpiresIn = 60 * 60 * 24 * 30;
  // セッションCookieを作成するためのIDを取得
  const idToken = (JSON.parse(req.body).idToken || "").toString();
  const refreshToken = (JSON.parse(req.body).refreshToken || "").toString();
  // Cookieに保存するセッションIDを作成する
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: idTokenExpiresIn,
  });

  // Cookieのオプション
  const options = {
    maxAge: idTokenExpiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  };

  const refreshTokenOptions = {
    maxAge: refreshTokenExpiresIn,
    httpOnly: false,
    secure: true,
    path: "/",
  };
  // セッションIDをCookieに設定する
  setCookie({ res }, "idToken", sessionCookie, options);
  setCookie({ res }, "refreshToken", refreshToken, refreshTokenOptions);

  res.send(JSON.stringify({ status: "success" }));
}
