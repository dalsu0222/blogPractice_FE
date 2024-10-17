import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastEditor from "../components/ToastEditor";
import style from "../styles/CreatePost.module.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setsummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    console.log(title, summary, files, content);
    const data = new FormData(); // FormData 객체 생성, FormData ??
    data.set("title", title);
    data.set("summary", summary);
    data.set("files", files);
    data.set("content", content);
    // 서버와 통신 코드 작성
    const response = await fetch(`${import.meta.env.VITE_API_URL}/postWrite`, {
      method: "POST",
      body: data,
      credentials: "include", // 쿠키를 주고받기 위해 필요
    });
    console.log("create response: ", response);
    if (response.ok) {
      alert("글이 등록되었습니다.");
      navigate("/");
    }
    // 글 작성 실패 시 경고창 출력
    else {
      alert("글 작성 실패");
    }
  };
  return (
    <section className={style.CreatePost}>
      <h2>글 작성페이지</h2>
      <form className={style.writecom} onSubmit={createNewPost}>
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
        <label>내용</label>
        <ToastEditor initialValue={content} onChange={setContent} />
        <button type="submit">등록</button>
      </form>
    </section>
  );
}
