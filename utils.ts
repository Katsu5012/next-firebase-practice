import type { FirebaseApp } from "firebase/app";
import type { Auth as FirebaseAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/**
 * @description Firebaseの管理画面から取得したAPIオブジェクト
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * @description FirebaseAppを返す
 */
export const getFirebaseApp = (): FirebaseApp | undefined => {
  if (typeof window === "undefined") return; // バックエンドで実行されないようにする
  return getApps()[0] || initializeApp(firebaseConfig);
};

/**
 * @description FirebaseAuthを返す
 */
export const getFirebaseAuth = (): FirebaseAuth => {
  return getAuth(getFirebaseApp());
};
/**
 * @description メールアドレスとパスワードで初回登録
 */
export const register = async (email: string, password: string) => {
  const auth = getFirebaseAuth();

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (response) => {
      const idToken = await response.user.getIdToken();
      const refreshToken = response.user.refreshToken;
      await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ idToken, refreshToken }),
      });
    })
    .catch((e) => {
      alert(e.message);
    });
  //  const update
};
/**
 * @description メールアドレスとパスワードでログイン
 */
export const login = async (email: string, password: string) => {
  // FirebaseAuthを取得する
  const auth = getFirebaseAuth();
  await signInWithEmailAndPassword(auth, email, password).then(
    async (response) => {
      const idToken = await response.user.getIdToken();
      const refreshToken = response.user.refreshToken;
      await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ idToken, refreshToken }),
      });
    }
  );
};

/**
 * @description ログアウトさせる
 */
export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch("/api/sessionLogout", { method: "POST" });
};
