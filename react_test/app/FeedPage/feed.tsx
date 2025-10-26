"use client"
import { useState } from "react";

interface Post {
  name: string;
  text: string;
  likes: number;
}

export default function Feed() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [count, setCount] = useState<Post[]>([]);

  const SubmitPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) return;

    const newPost: Post = {
      name: name.trim(),
      text: text.trim(),
      likes: 0,
    };

    setCount([newPost, ...count]);
    setName("");
    setText("");
  };
  const addLike = (index: number) => {
    const newPost = [...count];
    newPost[index].likes += 1;
    setCount(newPost);
  };

  return (
    <>
      <h1 className="text-center text-[100px] mt-5 mb-5 cursor-default">Mini Social Feed</h1>
      <form onSubmit={SubmitPost} className="ml-[525px] mb-5">
        <input type="text" placeholder="Name.." className=" px-5 py-2 text-4xl w-65" value={name} onChange={(e) => setName(e.target.value)}/>
      </form>
      <form onSubmit={SubmitPost} className="ml-[420px]">
        <input type="text" placeholder="Whats on your mind ..." className=" px-5 py-2 text-4xl w-105" value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="submit" className="text-center cursor-default text-2xl border border-black/90 py-2 pr-2 pl-2 rounded-2xl ml-[50px]">post</button>
      </form>
      <div className="flex flex-col items-center mt-10 gap-5">
        {count.map((post, index) => (
          <div key={index} className="border border-black/60 rounded-2xl p-5 w-[800px] text-center bg-white/20">
            <h2 className="text-3xl font-bold">{post.name}</h2>
            <p className="text-2xl mt-2">{post.text}</p>
            <button className="text-3xl" onClick={() => addLike(index)}>❤️</button>
            <span className="text-2xl">{post.likes} Likes</span>
          </div>
        ))}
      </div>
    </>
  );
}
