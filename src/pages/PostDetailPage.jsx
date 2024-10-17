import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import style from "../styles/PostDetailPage.module.css";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useSelector } from "react-redux";

export default function PostDetailPage() {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const navigate = useNavigate();
  console.log(username);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/postDetail/${postId}`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setPostInfo(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    });
  };

  const deletePost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deletePost/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("삭제되었습니다.");
        navigate("/");
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={style.PostDetailPage}>
      <h2>블로그 상세 페이지</h2>
      <section>
        <div className={style.detailimg}>
          <img
            src={`${import.meta.env.VITE_API_URL}/${postInfo.cover}`}
            alt=""
          ></img>
          <h3>{postInfo.title}</h3>
        </div>
        <div className={style.info}>
          <p>작성자: {postInfo.author}</p>
          <p>작성일: {formatDate(postInfo.createdAt)}</p>
        </div>
        <div className={style.summary}>{postInfo.summary}</div>
        <div className={style.desc}>
          {/* 비동기 데이터 fetch*/}
          {postInfo.content && <Viewer initialValue={postInfo.content} />}{" "}
        </div>
      </section>

      <section className={style.btns}>
        {/* 로그인한 사용자만 글을 수정, 삭제할 수 있습니다. */}
        {username === postInfo.author ? (
          <>
            <Link to={`/edit/${postId}`}>수정</Link>
            <span onClick={deletePost}>삭제</span>
          </>
        ) : null}
        <span onClick={() => navigate("/")}>목록으로</span>
      </section>

      <section className={style.commentlist}>댓글목록</section>
    </section>
  );
}
