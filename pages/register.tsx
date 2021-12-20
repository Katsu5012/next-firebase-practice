import type { FormEvent } from "react";

import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { register } from "../utils";
const Register: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault;
    await register(email, password).then((response) => {
      console.log(response);
      router.push("/dashboard");
    });
  };
  return (
    <div>
      <p>初回登録ページ</p>

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

      <button onClick={(e) => onSubmit(e)}>register</button>
    </div>
  );
};

export default Register;
