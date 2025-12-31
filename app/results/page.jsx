"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading) return <p className="text-center py-20">Loading results...</p>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Monthly Exam Results
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Month</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{r.name}</td>
                  <td className="py-3 px-4">{r.month}</td>
                  <td className="py-3 px-4">{r.subject}</td>
                  <td className="py-3 px-4 font-semibold text-green-700">{r.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
