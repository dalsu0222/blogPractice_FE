import { useState } from "react";
import style from "../styles/LoginPage.module.css";

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log(username, password, passwordCheck);

    //username은4자 이상이어야 하며 영어로 시작해야 합니다.
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      alert("아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.");
      return;
    }

    if (password.length < 4) {
      alert("비밀번호는 4자 이상이어야 합니다.");
      return;
    }

    //password는 대소문자 특수문자를 포함하여 8자 이상이어야 합니다.
    // if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    //     password
    //   )
    // ) {
    //   alert("비밀번호는 대소문자 특수문자를 포함하여 8자 이상이어야 합니다.");
    //   return;
    // }

    //password와 passwordCheck가 일치해야 합니다.
    if (password !== passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 회원가입 정보를 서버로 전송
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // text/paine 일반 텍스트 타입
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    console.log("-----", response);

    // 회원가입 성공시 로그인 페이지로 이동
    if (response.ok) {
      alert("회원가입 성공");
      window.location.replace("/login");
    }
  };

  return (
    <form className={style.RegisterPage} onSubmit={register}>
      <h2>회원가입페이지</h2>
      <input
        type="text"
        placeholder="사용자이름"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="패스워드"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="패스워드 확인"
        value={passwordCheck}
        onChange={(e) => setPasswordCheck(e.target.value)}
      />
      <button type="submit">가입하기</button>
    </form>
  );
}
