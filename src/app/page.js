"use client"

import { useState } from "react";
import { scrape } from "./search/scrape";

export default function Home() {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [userId, setUserId] = useState('');
  const Submit = async (e) => {
    e.preventDefault();
    const id = await scrape(searchPrompt);
    setUserId(id);
    console.log(id)
  }

  return (
    <div>
      <input type="text" value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} />
      <button onClick={(e) => Submit(e)}>search</button>
      {userId && <div>userid:{userId}</div>}
    </div>
  );
}
