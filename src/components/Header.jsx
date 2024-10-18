import { useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserAllInfo } from "../store/userStore";
import style from "../styles/Header.module.css";
import Logo from "./Logo";

export default function Header() {
  let user = useSelector((state) => state.user.user);
  //   console.log(user);
  const username = user?.username;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogoClick = () => {
    navigate("/");
  };

  const fetchProfile = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/profile`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const userInfo = await response.json();
      dispatch(setUserAllInfo(userInfo));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, location]); // 의존성 배열의 location : 새로고침시에도 프로필 유지되도록 하기위함

  const logout = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    dispatch(setUserAllInfo(null));
  };

  return (
    <header className={style.Header}>
      <h1 onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <Logo />
      </h1>
      <nav className={style.gnb}>
        {username ? (
          <>
            <Link to="/create">새글등록</Link>
            <span onClick={logout}>로그아웃</span>
            <Link to={`/userpage/${username}`}>{username}님 입장</Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}
