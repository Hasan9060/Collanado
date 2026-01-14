"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, addDoc, setDoc } from "firebase/firestore";
import {
    Users,
    GraduationCap,
    Search,
    Filter,
    Edit2,
    Trash2,
    Save,
    X,
    Loader2,
    CheckCircle,
    AlertCircle,
    MoreVertical,
    Plus
} from "lucide-react";
import { toast } from "sonner";

export default function AdminPanel() {
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    // Enhanced state for results management
    const [view, setView] = useState<"students" | "teachers" | "results">("students");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);

    // Results State
    const [results, setResults] = useState<any[]>([]);
    const [isAddResultOpen, setIsAddResultOpen] = useState(false);

    // User Management State
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Teacher",
        department: "Pre-Engineering",
        rollNumber: "",
        fatherName: ""
    });

    // Auth import needed for creating users
    const [authWait, setAuthWait] = useState(false); // Placeholder for auth logic if needed

    // Import auth from firebase/auth dynamically if not imported at top or use client SDK
    // Assuming auth is available or we just create DB entries for now as per previous logic pattern in this file?
    // Actually, usually we need createUserWithEmailAndPassword. 
    // BUT the previous incomplete code snippet I saw in history implied using 'setDoc' with 'userCredential.user.uid'.
    // Use the `auth` from `@/lib/firebase` line 4 which is `db`. 
    // I need to import `auth` and `createUserWithEmailAndPassword`.
    // For now, I'll add the imports in a separate chunk.

    // Result Form
    const [resultForm, setResultForm] = useState({
        studentId: "",
        examTitle: "",
        subject: "",
        totalMarks: 100,
        obtainedMarks: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    // Dedicated effect for fetching results when tab changes
    // Dedicated effect for fetching results when tab changes
    useEffect(() => {
        if (view === "results") {
            const fetchResults = async () => {
                setLoading(true);
                try {
                    const q = query(collection(db, "results"), orderBy("publishedAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    const resultsData = querySnapshot.docs.map(doc => ({
                        _id: doc.id,
                        ...doc.data(),
                        subjects: doc.data().subjects ? JSON.parse(doc.data().subjects) : []
                    }));
                    setResults(resultsData);
                } catch (e) {
                    console.error("Failed to fetch results", e);
                    toast.error("Failed to fetch results");
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        }
    }, [view]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const studentSnap = await getDocs(query(collection(db, "students"), orderBy("createdAt", "desc")));
            const teacherSnap = await getDocs(query(collection(db, "teachers"), orderBy("createdAt", "desc")));

            setStudents(studentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTeachers(teacherSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (user: any) => {
        setEditingId(user.id);
        setEditForm({ ...user });
    };

    const handleUpdate = async () => {
        if (!editForm) return;
        try {
            const userRef = doc(db, view as string, editingId!);
            await updateDoc(userRef, editForm);
            toast.success("Profile updated successfully!");
            setEditingId(null);
            fetchData();
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this?")) return;

        // Handle Result Deletion
        if (view === "results") {
            try {
                await deleteDoc(doc(db, "results", id));
                toast.success("Result deleted");
                setResults(results.filter(r => r._id !== id));
            } catch (error) {
                console.error("Error deleting result:", error);
                toast.error("Failed to delete result");
            }
            return;
        }

        // Handle User Deletion
        try {
            await deleteDoc(doc(db, view, id));
            toast.success("User deleted");
            fetchData();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

            if (view === "teachers") {
                // Determine Department based on Role or Selection
                const finalDepartment = form.role === 'Teacher' ? form.department : 'Management';

                await setDoc(doc(db, "teachers", userCredential.user.uid), {
                    name: form.name,
                    email: form.email,
                    role: form.role,
                    department: finalDepartment,
                    createdAt: new Date().toISOString()
                });
                toast.success("Teacher added successfully");
            } else {
                await setDoc(doc(db, "students", userCredential.user.uid), {
                    name: form.name,
                    email: form.email,
                    rollNumber: form.rollNumber,
                    fatherName: form.fatherName,
                    department: form.department,
                    createdAt: new Date().toISOString()
                });
                toast.success("Student added successfully");
            }

            setLoading(false);
            setIsAddUserOpen(false);
            fetchData(); // Refresh list
            setForm({
                name: "",
                email: "",
                password: "",
                role: "Teacher",
                department: "Pre-Engineering",
                rollNumber: "",
                fatherName: ""
            });

        } catch (error: any) {
            console.error(error);
            setLoading(false);
            toast.error("Error: " + error.message);
        }
    };

    const handleSubmitResult = async (e: React.FormEvent) => {
        e.preventDefault();

        // Find selected student details
        const selectedStudent = students.find(s => s.id === resultForm.studentId);
        if (!selectedStudent) {
            toast.error("Please select a valid student from the portal");
            return;
        }

        // Calculate Grade automatically
        const percentage = (resultForm.obtainedMarks / resultForm.totalMarks) * 100;
        let grade = 'F';
        if (percentage >= 80) grade = 'A+';
        else if (percentage >= 70) grade = 'A';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 40) grade = 'D';

        const submitData = new FormData();
        submitData.append('title', resultForm.examTitle);
        submitData.append('studentName', selectedStudent.name);
        submitData.append('rollNumber', selectedStudent.rollNumber || "N/A");
        submitData.append('class', selectedStudent.department || "General");

        // Create subject array
        const subjects = [{
            subjectName: resultForm.subject,
            totalMarks: Number(resultForm.totalMarks),
            obtainedMarks: Number(resultForm.obtainedMarks),
            grade: grade
        }];

        try {
            setLoading(true);
            const dataToSave = {
                title: resultForm.examTitle || "Untitled Exam",
                studentName: selectedStudent.name || "Unknown Student",
                rollNumber: selectedStudent.rollNumber || "N/A",
                class: selectedStudent.department || "General",
                subjects: JSON.stringify(subjects),
                publishedAt: new Date().toISOString()
            };

            // Ensure no undefined values
            Object.keys(dataToSave).forEach(key => {
                if (dataToSave[key as keyof typeof dataToSave] === undefined) {
                    dataToSave[key as keyof typeof dataToSave] = "";
                }
            });

            const docRef = await addDoc(collection(db, "results"), dataToSave);

            setLoading(false);
            toast.success("Result published to student portal!");
            setIsAddResultOpen(false);
            setResultForm({
                studentId: "",
                examTitle: "",
                subject: "",
                totalMarks: 100,
                obtainedMarks: 0
            });

            // Add to local state to avoid refetch
            const newResult = {
                _id: docRef.id,
                ...dataToSave,
                subjects: subjects
            };
            setResults([newResult, ...results]);

        } catch (error: any) {
            console.error("Error creating result:", error);
            setLoading(false);
            toast.error("Failed: " + (error.message || "Unknown error"));
        }
    };

    const filteredData = view === "results"
        ? results.filter(r => r.studentName?.toLowerCase().includes(search.toLowerCase()) || r.title?.toLowerCase().includes(search.toLowerCase()))
        : (view === "students" ? students : teachers).filter(user =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.department?.toLowerCase().includes(search.toLowerCase())
        );

    const SUBJECT_OPTIONS = [
        "Biology", "Physics", "Chemistry", "Mathematics", "Computer Science",
        "English", "Urdu", "Islamiat", "Pak Studies", "Economics",
        "Principles of Accounting", "Principles of Commerce", "Business Math"
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Admin Panel</h1>
                        <p className="text-gray-500 font-medium">Manage students, faculty & exam results</p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-sm border border-gray-100 overflow-x-auto">
                        <button
                            onClick={() => setView("students")}
                            className={`px-6 md:px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${view === "students" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Students
                        </button>
                        <button
                            onClick={() => setView("teachers")}
                            className={`px-6 md:px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${view === "teachers" ? "bg-red-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Teachers
                        </button>
                        <button
                            onClick={() => setView("results")}
                            className={`px-6 md:px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${view === "results" ? "bg-yellow-500 text-white shadow-lg" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Results
                        </button>
                    </div>
                </div>

                {/* Add Result Modal */}
                {isAddResultOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Add Marks</h2>
                                <button onClick={() => setIsAddResultOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitResult} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Select Student (Portal User)</label>
                                    <select
                                        required
                                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-yellow-500 outline-none font-bold"
                                        value={resultForm.studentId}
                                        onChange={e => setResultForm({ ...resultForm, studentId: e.target.value })}
                                    >
                                        <option value="">-- Choose Student --</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.department}) - {s.rollNumber || "No Roll No"}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Exam Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Midterm Physics 2024"
                                        className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-yellow-500 outline-none font-bold"
                                        value={resultForm.examTitle}
                                        onChange={e => setResultForm({ ...resultForm, examTitle: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                                        <select
                                            required
                                            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-yellow-500 outline-none font-bold"
                                            value={resultForm.subject}
                                            onChange={e => setResultForm({ ...resultForm, subject: e.target.value })}
                                        >
                                            <option value="">-- Select Subject --</option>
                                            {SUBJECT_OPTIONS.map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Total Marks</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-yellow-500 outline-none font-bold"
                                            value={resultForm.totalMarks}
                                            onChange={e => setResultForm({ ...resultForm, totalMarks: Number(e.target.value) })}
                                        />
                                    </div>
                                    {view === "teachers" && (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Role</label>
                                                <select
                                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                    value={form.role}
                                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                >
                                                    <option value="Teacher">Teacher</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Clerk">Clerk</option>
                                                </select>
                                            </div>

                                            {form.role === 'Teacher' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Department / Field</label>
                                                    <select
                                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                        value={form.department}
                                                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                                                    >
                                                        <option value="Pre-Engineering">Pre-Engineering</option>
                                                        <option value="Pre-Medical">Pre-Medical</option>
                                                        <option value="Computer Science">Computer Science</option>
                                                        <option value="Commerce">Commerce</option>
                                                        <option value="Humanities">Humanities</option>
                                                    </select>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Obtained Marks</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-3 bg-gray-50 text-blue-600 text-lg rounded-xl border-2 border-transparent focus:border-yellow-500 outline-none font-black"
                                        value={resultForm.obtainedMarks}
                                        onChange={e => setResultForm({ ...resultForm, obtainedMarks: Number(e.target.value) })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                    Publish Result
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Action Bar */}
                <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={`Search ${view}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-blue-100 rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-medium"
                        />
                    </div>
                    <button
                        onClick={() => view === "results" ? setIsAddResultOpen(true) : setIsAddUserOpen(true)}
                        className={`px-6 py-4 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${view === 'results' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-900 hover:bg-gray-800'
                            }`}>
                        <Plus size={20} />
                        Add New {view === "students" ? "Student" : view === "teachers" ? "Teacher" : "Result"}
                    </button>
                </div>

                {/* Add User Modal */}
                {isAddUserOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Add New {view === "students" ? "Student" : "Teacher"}</h2>
                                <button onClick={() => setIsAddUserOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                </div>

                                {view === "students" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Roll Number</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                value={form.rollNumber}
                                                onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Father's Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                value={form.fatherName}
                                                onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Department</label>
                                            <select
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                value={form.department}
                                                onChange={(e) => setForm({ ...form, department: e.target.value })}
                                            >
                                                <option value="Pre-Engineering">Pre-Engineering</option>
                                                <option value="Pre-Medical">Pre-Medical</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="Humanities">Humanities</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {view === "teachers" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Role</label>
                                            <select
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                value={form.role}
                                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                            >
                                                <option value="Teacher">Teacher</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Clerk">Clerk</option>
                                            </select>
                                        </div>

                                        {form.role === 'Teacher' && (
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Department / Field</label>
                                                <select
                                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-black outline-none font-bold text-gray-900 transition-all"
                                                    value={form.department}
                                                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                                                >
                                                    <option value="Pre-Engineering">Pre-Engineering</option>
                                                    <option value="Pre-Medical">Pre-Medical</option>
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Commerce">Commerce</option>
                                                    <option value="Humanities">Humanities</option>
                                                </select>
                                            </div>
                                        )}
                                    </>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex justify-center gap-2 mt-4"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-blue-600" size={48} />
                            <p className="font-bold text-gray-400 animate-pulse">FACILITATING DATA...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {view !== 'results' ? (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User Details</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Role / Dept</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Registered At</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                            <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredData.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    {editingId === user.id ? (
                                                        <div className="space-y-2">
                                                            <input
                                                                className="w-full p-2 border rounded-lg text-sm"
                                                                value={editForm.name}
                                                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                            />
                                                            <input
                                                                className="w-full p-2 border rounded-lg text-sm"
                                                                value={editForm.email}
                                                                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                                                <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt="" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-gray-900 uppercase text-sm tracking-tight">{user.name}</p>
                                                                <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    {editingId === user.id && view === "students" ? (
                                                        <select
                                                            className="p-2 border rounded-lg text-sm"
                                                            value={editForm.department}
                                                            onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                                                        >
                                                            <option value="Pre-Medical">Pre-Medical</option>
                                                            <option value="Pre-Engineering">Pre-Engineering</option>
                                                            <option value="Computer Science">Computer Science</option>
                                                            <option value="Commerce">Commerce</option>
                                                        </select>
                                                    ) : (
                                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === 'student' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                                            }`}>
                                                            {user.department || user.role}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-green-500 font-bold text-xs">
                                                        <CheckCircle size={14} />
                                                        ACTIVE
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {editingId === user.id ? (
                                                            <>
                                                                <button onClick={handleUpdate} className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
                                                                    <Save size={18} />
                                                                </button>
                                                                <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all">
                                                                    <X size={18} />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => startEdit(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                                                    <Edit2 size={18} />
                                                                </button>
                                                                <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Student</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Exam Title</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Subject Results</th>
                                            <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredData.map((res: any) => (
                                            <tr key={res._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6 text-sm font-bold text-gray-500 font-mono">
                                                    {new Date(res.publishedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-black text-sm">
                                                            {res.studentName?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{res.studentName}</p>
                                                            <p className="text-xs text-gray-500 font-medium">{res.rollNumber}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-900">
                                                    {res.title}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {res.subjects?.map((s: any, i: number) => (
                                                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-700">
                                                                {s.subjectName}: {s.grade} ({s.obtainedMarks}/{s.totalMarks})
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end">
                                                        <button onClick={() => handleDelete(res._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {filteredData.length === 0 && (
                                <div className="p-20 text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="text-gray-300" size={32} />
                                    </div>
                                    <p className="font-bold text-gray-400">NO RECORDS FOUND</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
