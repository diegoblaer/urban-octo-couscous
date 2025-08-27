"use client";
import { useState } from "react";

const API_URL = "http://localhost:3100";

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/create-tx`, {
        method: "POST",
        body: JSON.stringify({ amount, description }),
      });
      const res = await fetch(`${API_URL}/get-tx`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto my-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Transaction Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="bg-white  text-black"
        />
        <input
          type="text"
          placeholder="Transaction Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-white text-black"
        />
        <button type="submit" className="bg-gray-500">
          Submit
        </button>
      </form>
      <div>
        {data.map((tx, i) => (
          <div key={i}>
            <p className="text-white">Amount: {tx.amount}</p>
            <p className="text-white">Description: {tx.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
