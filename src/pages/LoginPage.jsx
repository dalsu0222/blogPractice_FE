import { useState } from "react";
import { Navigate } from "react-router-dom";
import style from "../styles/LoginPage.module.css";

export default function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // 로그인 시도 후 이동 여부 저장
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    console.log(username, password);
    // 서버와 통신 코드 작성
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json", // text/paine 일반 텍스트 타입
      },
      credentials: "include", // 쿠키를 주고받기 위해 필요
    });
    console.log("login response: ", response);
    // 로그인 성공 시 메인 페이지로 이동
    if (response.ok) {
      setRedirect(true);
    }
    // 로그인 실패 시 경고창 출력
    else {
      //   alert("로그인 실패");
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form className={style.LoginPage} onSubmit={login}>
      <h2>로그인 페이지</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="패스워드"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className={style.error}>{error}</div>}
      <button type="submit">로그인</button>
    </form>
  );
}
