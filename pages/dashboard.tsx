import type { GetServerSideProps, NextPage } from "next";

import nookies from "nookies";
import { useRouter } from "next/router";
import axios from "axios";
import { logout } from "../utils"; // 上記で実装したファイル
import { firebaseAdmin } from "../firebaseAdmin"; // この後に実装するファイル
import FirestoreAddButton from "../components/FirestoreAddButton";
const DashboardPage: NextPage<{ email: string; uid: string }> = ({
  email,
  uid,
}) => {
  const router = useRouter();
  const onLogout = async () => {
    await logout(); // ログアウトさせる
    router.push("/Login"); // ログインページへ遷移させる
  };
  const today = paddingZeroToDate(new Date());
  console.log(today);
  return (
    <div>
      <h1>Dashboard Pages</h1>

      <h2>email: {email}</h2>
      <h2>uid:{uid}</h2>
      <h3>today:{today}</h3>

      <button onClick={onLogout}>Logout</button>
      <FirestoreAddButton></FirestoreAddButton>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const idToken = cookies.idToken || "";
  //   セッションIDを検証して、認証情報を取得する
  //   try {
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(idToken, true)
    .catch(() => null);
  // .then((res) => {
  //   console.log(res);
  //   return {
  //     props: {
  //       email: res.data.email,
  //     },
  //   };
  // });
  // .catch(async (err) => {
  //   const refreshToken = cookies.refreshToken || "";
  //   const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
  //   const refreshTokenResponse = await axios
  //     .post(url, {
  //       grant_type: "refresh_token",
  //       refresh_token: refreshToken,
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       return {
  //         redirect: {
  //           destination: "/Login",
  //           permanent: false,
  //         },
  //       };
  //     });
  //   if (!refreshTokenResponse) {
  //     return {
  //       redirect: {
  //         destination: "/Login",
  //         permanent: false,
  //       },
  //     };
  //   }
  // });
  if (!user) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }
  //   認証情報が無い場合は、ログイン画面へ遷移させる
  console.log(user);
  //   user 型
  //   {
  //   iss: 'https://session.firebase.google.com/next-firebase-e0b0e',
  //   aud: 'next-firebase-e0b0e',
  //   auth_time: 1640299777,
  //   user_id: '41nUmGgz2yaguboJQ9JrTROL1Up1',
  //   sub: '41nUmGgz2yaguboJQ9JrTROL1Up1',
  //   iat: 1640299778,
  //   exp: 1640300078,
  //   email: 'yamada@yamada.com',
  //   email_verified: false,
  //   firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
  //   uid: '41nUmGgz2yaguboJQ9JrTROL1Up1'
  // }
  return {
    props: {
      email: user.email,
      uid: user.uid,
    },
  };
};

export default DashboardPage;

const paddingZeroToDate = (day: Date) => {
  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
};
