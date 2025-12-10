"use client"; 

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askBot = async () => {
    try {
      const res = await fetch("/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.response);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setAnswer("Failed to get response from backend");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>syncHer Chatbot</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: "300px", marginRight: "1rem" }}
      />
      <button onClick={askBot}>Ask</button>
      <p>Answer: {answer}</p>
    </div>
  );
}
