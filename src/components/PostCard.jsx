import { Link } from "react-router-dom";
import style from "../styles/PostCard.module.css";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${post._id}`);
  };

  return (
    <article className={style.PostCard} onClick={goDetail}>
      <div className={style.post_text}>
        <h2 className={style.__title}>{post.title}</h2>
        <p className={style.__info}>
          <Link
            to={`/userpage/${post.author}`}
            className={style.author}
            onClick={(e) => e.stopPropagation()} // goDetail 함수 실행 방지
          >
            {post.author}
          </Link>
          <time className={style.date}>{post.createdAt}</time>
        </p>
        <p className={style.__dec}>{post.content}</p>
      </div>
      <div className={style.post_img} onClick={goDetail}>
        <img src={`${import.meta.env.VITE_API_URL}/${post.cover}`} alt="" />
      </div>
    </article>
  );
}
