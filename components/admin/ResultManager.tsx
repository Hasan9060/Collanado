"use client";

import { useState } from "react";
import { Plus, Trash2, Save, X, Search, FileText, CheckCircle, AlertCircle, Award } from "lucide-react";
import { createResult, deleteResult } from "@/app/actions/results";

interface Result {
    _id: string;
    title: string;
    studentName: string;
    rollNumber: string;
    class: string;
    publishedAt: string;
    subjects: {
        subjectName: string;
        totalMarks: number;
        obtainedMarks: number;
        grade: string;
    }[];
}

interface ResultManagerProps {
    initialResults: Result[];
}

export default function ResultManager({ initialResults }: ResultManagerProps) {
    const [results, setResults] = useState<Result[]>(initialResults);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        studentName: "",
        rollNumber: "",
        class: "",
        subjects: [{ subjectName: "", totalMarks: 100, obtainedMarks: 0, grade: "" }]
    });

    const handleSubjectChange = (index: number, field: string, value: any) => {
        const newSubjects = [...formData.subjects];
        newSubjects[index] = { ...newSubjects[index], [field]: value };

        // Auto-calculate grade based on updated marks
        if (field === 'obtainedMarks' || field === 'totalMarks') {
            const obtained = field === 'obtainedMarks' ? Number(value) : newSubjects[index].obtainedMarks;
            const total = field === 'totalMarks' ? Number(value) : newSubjects[index].totalMarks;
            let grade = '';
            if (total > 0) {
                const percentage = (obtained / total) * 100;
                if (percentage >= 80) grade = 'A+';
                else if (percentage >= 70) grade = 'A';
                else if (percentage >= 60) grade = 'B';
                else if (percentage >= 50) grade = 'C';
                else if (percentage >= 40) grade = 'D';
                else grade = 'F';
            }
            newSubjects[index].grade = grade;
        }

        setFormData({ ...formData, subjects: newSubjects });
    };

    const addSubjectRow = () => {
        setFormData({
            ...formData,
            subjects: [...formData.subjects, { subjectName: "", totalMarks: 100, obtainedMarks: 0, grade: "" }]
        });
    };

    const removeSubjectRow = (index: number) => {
        if (formData.subjects.length > 1) {
            const newSubjects = formData.subjects.filter((_, i) => i !== index);
            setFormData({ ...formData, subjects: newSubjects });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("studentName", formData.studentName);
        data.append("rollNumber", formData.rollNumber);
        data.append("class", formData.class);
        data.append("subjects", JSON.stringify(formData.subjects));

        const res = await createResult(data);
        if (res.success) {
            // Optimistic update or just reload
            // Ideally we get the new item back, but for now let's just reload page or rely on revalidate
            window.location.reload();
            setIsAdding(false);
            setFormData({
                title: "",
                studentName: "",
                rollNumber: "",
                class: "",
                subjects: [{ subjectName: "", totalMarks: 100, obtainedMarks: 0, grade: "" }]
            });
        } else {
            alert("Failed to create result");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this result?")) {
            const res = await deleteResult(id);
            if (res.success) {
                setResults(results.filter(r => r._id !== id));
            } else {
                alert("Failed to delete result");
            }
        }
    };

    const filteredResults = results.filter(r =>
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                        <Award className="text-yellow-500" size={32} />
                        Manage Results
                    </h1>
                    <p className="text-gray-500 font-medium">Add and manage student examination results efficiently.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    {isAdding ? "Cancel" : "Add New Result"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-yellow-100 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Enter Result Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Exam Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Annual Exam 2024"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-bold outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Class/Department</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. BSCS"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-bold outline-none"
                                    value={formData.class}
                                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-bold outline-none"
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Roll Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Roll No / Student ID"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-bold outline-none"
                                    value={formData.rollNumber}
                                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 border-l-4 border-yellow-500 pl-3">Subjects & Marks</h3>
                                <button type="button" onClick={addSubjectRow} className="text-sm font-bold text-yellow-600 hover:text-yellow-700 flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                                    <Plus size={16} /> Add Subject
                                </button>
                            </div>

                            <div className="grid grid-cols-12 gap-2 mb-2 px-2">
                                <div className="col-span-4 text-xs font-bold text-gray-400 uppercase">Subject</div>
                                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase text-center">Total</div>
                                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase text-center">Obtained</div>
                                <div className="col-span-1 text-xs font-bold text-gray-400 uppercase text-center">Grd</div>
                                <div className="col-span-1"></div>
                            </div>

                            <div className="space-y-3">
                                {formData.subjects.map((subject, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="col-span-4">
                                            <input
                                                type="text"
                                                placeholder="Subject Name"
                                                className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:border-yellow-500 outline-none font-medium text-sm"
                                                value={subject.subjectName}
                                                onChange={(e) => handleSubjectChange(index, "subjectName", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:border-yellow-500 outline-none font-bold text-center text-sm"
                                                value={subject.totalMarks}
                                                onChange={(e) => handleSubjectChange(index, "totalMarks", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:border-yellow-500 outline-none font-bold text-center text-sm text-blue-600"
                                                value={subject.obtainedMarks}
                                                onChange={(e) => handleSubjectChange(index, "obtainedMarks", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <input
                                                type="text"
                                                readOnly
                                                className="w-full p-2 bg-gray-100 rounded-lg border-none font-black text-center text-sm text-gray-500"
                                                value={subject.grade}
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            {formData.subjects.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubjectRow(index)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <span className="animate-spin">⏳</span> : <Save size={20} />}
                                {loading ? "Saving Result..." : "Save Result"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Results</h2>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or roll no..."
                            className="w-full md:w-64 pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-yellow-500 transition-all outline-none font-medium text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Published</th>
                                <th className="text-left py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Student</th>
                                <th className="text-left py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Roll No</th>
                                <th className="text-left py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Exam Title</th>
                                <th className="text-left py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Result</th>
                                <th className="text-right py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredResults.map((result) => (
                                <tr key={result._id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-bold text-gray-400 font-mono">
                                        {new Date(result.publishedAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-yellow-700 font-black text-sm">
                                                {result.studentName.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900">{result.studentName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                                        {result.rollNumber}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-bold text-gray-900">
                                        {result.title}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide">
                                            <CheckCircle size={12} /> Published
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => handleDelete(result._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Result"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredResults.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                                        No results found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
