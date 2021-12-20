import type { FormEvent } from "react";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

import { login } from "../utils"; // 上記で実装したファイル

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
  const onSubmit = async (event: FormEvent) => {
    // デフォルトの<form />の挙動を無効にする
    event.preventDefault();

    // email・passwordを使ってログイン
    await login(email, password)
      .then(() => {
        router.push("/dashboard"); // ダッシュボードページへ遷移させる
      })
      .catch((e) => {
        alert("Error: " + e.message);
      });
  };

  return (
    <div>
      <h1>ログイン</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;