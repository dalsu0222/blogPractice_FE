import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToastEditor from "../components/ToastEditor";
import style from "../styles/CreatePost.module.css";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setsummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`
      );
      const data = await response.json();
      console.log(data);
      setTitle(data.title);
      setsummary(data.summary);
      setContent(data.content);
      setFiles(data.files);
      setCover(data.cover);
    };
    getPost();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    console.log(files);
    if (files) {
      // files[0]에서 files로 변경
      data.set("files", files);
    }

    // 서버와 통신 코드 작성
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${postId}`,
      {
        method: "PUT",
        body: data,
        credentials: "include", // 쿠키를 주고받기 위해 필요
      }
    );
    console.log("update response: ", response);
    if (response.ok) {
      alert("글이 수정되었습니다.");
      navigate(`/detail/${postId}`);
    }
    // 글 작성 실패 시 경고창 출력
    else {
      alert("글 작성 실패");
    }
  };

  return (
    <section className={style.CreatePost}>
      <h2>글 작성페이지</h2>
      <form className={style.writecom} onSubmit={updatePost}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="summary">요약내용</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={(e) => setsummary(e.target.value)}
          placeholder="요약내용을 입력해주세요"
        />
        <label htmlFor="files">파일첨부</label>
        <input
          type="file"
          id="files"
          name="files"
          onChange={(e) => setFiles(e.target.files[0])} // e.target.files[0]로 변경
        />
        <p className={style.smallimg}>
          <img src={`${import.meta.env.VITE_API_URL}/${cover}`} alt=""></img>
        </p>
        <label>내용</label>
        <ToastEditor initialValue={content} onChange={setContent} />
        <button type="submit">수정</button>
      </form>
    </section>
  );
}
