import { useState, useEffect } from "react";
import style from "../styles/MainPage.module.css";
import PostCard from "../components/PostCard";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/postList`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPostList(data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={style.MainPage}>
      {isLoading ? (
        <div>로딩중...</div>
      ) : postList.length > 0 ? (
        postList.map((post) => <PostCard key={post._id} post={post} />) // post.id 대신 mongoDB에서 사용하는 _id를 사용
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </section>
  );
}
