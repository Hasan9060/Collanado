"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, orderBy, query, addDoc, where, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    User,
    Users,
    LayoutDashboard,
    Settings,
    LogOut,
    ClipboardCheck,
    Calendar,
    BookMarked,
    Bell,
    Menu,
    X,
    Loader2,
    Trophy,
    Save,
    Search,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const theme = {
    primary: "bg-red-600",
    secondary: "bg-red-50",
    accent: "text-red-600",
    border: "border-red-100",
    hover: "hover:bg-red-700",
    light: "bg-red-100",
};

export default function TeacherDashboard() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState("dashboard"); // "dashboard", "results"

    // Result State
    // const [students, setStudents] = useState<any[]>([]); // Removed: No longer fetching all students
    const [publishedResults, setPublishedResults] = useState<any[]>([]);
    const [submissionLoading, setSubmissionLoading] = useState(false);

    // Search State
    const [searchRollNo, setSearchRollNo] = useState("");
    const [searchedStudent, setSearchedStudent] = useState<any>(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const [resultForm, setResultForm] = useState({
        studentId: "",
        examTitle: "",
        subject: "",
        totalMarks: 100,
        obtainedMarks: 0
    });

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(db, "teachers", user.uid));
                if (userDoc.exists()) {
                    setProfile(userDoc.data());
                } else {
                    router.push("/portal/login");
                }
            } else {
                router.push("/portal/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    // Removed: Fetch all students effect
    /*
    useEffect(() => {
        const fetchStudents = async () => {
            const studentSnap = await getDocs(query(collection(db, "students"), orderBy("name")));
            setStudents(studentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchStudents();
    }, []); 
    */

    // Search Student Function
    const handleSearchStudent = async (rollNo: string) => {
        setSearchRollNo(rollNo);
        if (!rollNo.trim()) {
            setSearchedStudent(null);
            return;
        }

        setSearchLoading(true);
        try {
            // Try searching by roll number string
            let q = query(collection(db, "students"), where("rollNumber", "==", rollNo));
            let querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                // Formatting fallback: Try converting to strict number comparison if stored as number
                // Or maybe the user entered "001" but stored as "1"
                // For now, strict match.
                setSearchedStudent(null);
            } else {
                const doc = querySnapshot.docs[0];
                setSearchedStudent({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            console.error("Search error", error);
        } finally {
            setSearchLoading(false);
        }
    };

    // Fetch results published by current teacher
    useEffect(() => {
        const fetchResults = async () => {
            if (profile?.name) {
                const q = query(collection(db, "results"), where("publishedBy", "==", profile.name));
                const querySnapshot = await getDocs(q);
                const results = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    subjects: doc.data().subjects ? JSON.parse(doc.data().subjects) : []
                }));
                // Sort client side
                results.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
                setPublishedResults(results);
            }
        };
        if (activeView === 'results') fetchResults();
    }, [activeView, profile]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/portal/login");
    };

    const handleDeleteResult = async (id: string) => {
        if (!confirm("Are you sure you want to delete this result?")) return;
        try {
            await deleteDoc(doc(db, "results", id));
            setPublishedResults(prev => prev.filter(r => r.id !== id));
            toast.success("Result deleted successfully");
        } catch (e) {
            console.error(e);
            toast.error("Failed to delete result");
        }
    }

    const SUBJECT_OPTIONS = [
        "Biology", "Physics", "Chemistry", "Mathematics", "Computer Science",
        "English", "Urdu", "Islamiat", "Pak Studies", "Economics",
        "Principles of Accounting", "Principles of Commerce", "Business Math"
    ];

    const handleSubmitResult = async (e: React.FormEvent) => {
        e.preventDefault();

        // Find selected student details
        if (!searchedStudent) {
            toast.error("Please search and verify a valid student first");
            return;
        }
        const selectedStudent = searchedStudent;

        // Calculate Grade
        const percentage = (resultForm.obtainedMarks / resultForm.totalMarks) * 100;
        let grade = 'F';
        if (percentage >= 80) grade = 'A+';
        else if (percentage >= 70) grade = 'A';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 40) grade = 'D';

        const subjects = [{
            subjectName: resultForm.subject,
            totalMarks: Number(resultForm.totalMarks),
            obtainedMarks: Number(resultForm.obtainedMarks),
            grade: grade
        }];

        try {
            setSubmissionLoading(true);
            const dataToSave = {
                title: resultForm.examTitle || "Untitled Exam",
                studentName: selectedStudent.name || "Unknown Student",
                rollNumber: selectedStudent.rollNumber || "N/A",
                class: selectedStudent.department || "General",
                subjects: JSON.stringify(subjects),
                publishedBy: profile?.name,
                publishedAt: new Date().toISOString()
            };

            // Ensure no undefined values
            Object.keys(dataToSave).forEach(key => {
                if (dataToSave[key as keyof typeof dataToSave] === undefined) {
                    dataToSave[key as keyof typeof dataToSave] = "";
                }
            });

            const docRef = await addDoc(collection(db, "results"), dataToSave);

            setSubmissionLoading(false);
            toast.success("Result published to student portal!");

            // Add to local state
            const newResult = {
                id: docRef.id,
                ...dataToSave,
                subjects: subjects
            };
            setPublishedResults([newResult, ...publishedResults]);

            setResultForm({
                studentId: "",
                examTitle: resultForm.examTitle, // Keep title for easier entry
                subject: resultForm.subject, // Keep subject
                totalMarks: 100,
                obtainedMarks: 0
            });
            setSearchRollNo("");
            setSearchedStudent(null);

        } catch (error: any) {
            console.error("Error creating result:", error);
            setSubmissionLoading(false);
            toast.error("Failed: " + (error.message || "Unknown error"));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        );
    }

    const navItems = [
        { name: "Teacher Info", icon: User, id: "dashboard", href: "#" },
        { name: "Results", icon: Trophy, id: "results", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
                <div className={`p-8 ${theme.primary} text-white`}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
                            <User size={28} />
                        </div>
                        <div>
                            <h2 className="font-black text-xl tracking-tight uppercase">GDC TEACHER</h2>
                            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Faculty Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-full border-2 border-white/30 overflow-hidden">
                            <img
                                src={`https://ui-avatars.com/api/?name=${profile?.name}&background=fff&color=b91c1c&bold=true`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm truncate w-32">{profile?.name}</p>
                            <p className="text-xs opacity-70 truncate w-32">{profile?.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActiveView(item.id);
                                setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold group ${activeView === item.id
                                ? `${theme.light} ${theme.accent}`
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={22} className={activeView === item.id ? theme.accent : "group-hover:scale-110 transition-transform"} />
                            <span className="text-sm uppercase tracking-wide">{item.name}</span>
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-red-500 hover:bg-red-50 group mt-8"
                    >
                        <LogOut size={22} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm uppercase tracking-wide">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>

                    <h1 className="text-xl font-black text-gray-900 hidden lg:block uppercase tracking-tight">
                        {activeView === 'results' ? 'Manage Results' : 'Faculty Dashboard'}
                    </h1>

                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-700 hidden sm:block">{profile?.name}</span>
                            <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${profile?.name}&background=dc2626&color=fff`} alt="user" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Teacher Info View */}
                {activeView === 'dashboard' && (
                    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        {/* Profile Header Card */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 p-10 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-md border-4 border-white/30 overflow-hidden shrink-0">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${profile?.name}&background=fff&color=dc2626&bold=true&size=256`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">{profile?.name}</h1>
                                    <p className="text-red-100 font-bold text-lg uppercase mb-4">{profile?.role || "Teacher"}</p>
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                                            {profile?.department || "General"}
                                        </span>
                                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                                            Faculty Member
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                                        <User size={24} />
                                    </div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Info</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</span>
                                        <span className="text-sm font-black text-gray-900">{profile?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email</span>
                                        <span className="text-sm font-bold text-gray-700">{profile?.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Role</span>
                                        <span className="text-sm font-black uppercase text-red-600">{profile?.role || "Teacher"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Department</span>
                                        <span className="text-sm font-black text-gray-900">{profile?.department || "General"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                        <Settings size={24} />
                                    </div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Account Details</h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">User ID</span>
                                        <span className="text-xs font-mono font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                                            {user?.uid?.substring(0, 12)}...
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Account Status</span>
                                        <span className="text-sm font-black text-green-600 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results View */}
                {activeView === 'results' && (
                    <div className="p-8 space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                                    <Trophy size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Publish Results</h2>
                                <p className="text-gray-500 font-medium">Add marks for your assigned subject.</p>
                            </div>

                            {/* Session Setup - Step 1/2 */}
                            {!resultForm.subject || !resultForm.examTitle ? (
                                <div className="text-center py-10 animate-in zoom-in-95 duration-300">
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Exam Session Setup</h3>
                                    <p className="text-gray-500 font-medium mb-8">Configure the exam details once to start grading.</p>

                                    <div className="max-w-md mx-auto space-y-6 text-left">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                                            <select
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-red-500 outline-none font-bold text-gray-900 transition-all"
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
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Exam Title</label>
                                            <select
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-red-500 outline-none font-bold text-gray-900 transition-all"
                                                value={resultForm.examTitle}
                                                onChange={e => setResultForm({ ...resultForm, examTitle: e.target.value })}
                                            >
                                                <option value="">-- Select Exam Type --</option>
                                                <option value="Weekly Test">Weekly Test</option>
                                                <option value="Bi-Monthly Exam">Bi-Monthly Exam</option>
                                                <option value="Midterm Exam">Midterm Exam</option>
                                                <option value="Prelims Exam">Prelims Exam</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Total Marks</label>
                                            <input
                                                type="number"
                                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-red-500 outline-none font-bold text-gray-900 transition-all"
                                                value={resultForm.totalMarks}
                                                onChange={e => setResultForm({ ...resultForm, totalMarks: Number(e.target.value) })}
                                            />
                                        </div>

                                        <button
                                            disabled={!resultForm.subject || !resultForm.examTitle}
                                            onClick={() => { }} // State updates automatically, button just acts as visual confirmation to proceed (logic is conditioned on values existing)
                                            className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Start Grading Session
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Grading Interface - Step 2/2 */
                                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                                    {/* Locked Session Info Banner */}
                                    <div className="flex items-center justify-between mb-8 bg-gray-900 p-6 rounded-3xl text-white shadow-lg shadow-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                                <BookMarked size={24} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Active Session</p>
                                                <h3 className="font-bold text-lg leading-tight">{resultForm.subject}</h3>
                                                <p className="text-sm text-gray-400 font-medium">{resultForm.examTitle} • {resultForm.totalMarks} Marks</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setResultForm({ ...resultForm, examTitle: "" })}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
                                        >
                                            End Session
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitResult} className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Student Roll Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <Search size={20} />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    value={searchRollNo}
                                                    onChange={(e) => handleSearchStudent(e.target.value)}
                                                    placeholder="Enter Roll No (e.g. 101)"
                                                    className="w-full pl-11 p-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-black outline-none font-bold text-gray-900 transition-all placeholder:font-medium placeholder:text-gray-400 shadow-sm"
                                                />
                                                {searchLoading && (
                                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                                        <Loader2 className="animate-spin text-gray-400" size={20} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Found Student Card - Instant Feedback */}
                                            {searchedStudent ? (
                                                <div className="mt-2 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-4 animate-in slide-in-from-top-2 fade-in">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-green-100/50 shadow-sm">
                                                        <User className="text-green-600" size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{searchedStudent.name}</h4>
                                                        <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                                                            {searchedStudent.department || "General"} • {searchedStudent.fatherName}
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="bg-white text-green-700 font-black px-3 py-1 rounded-lg text-xs shadow-sm border border-green-100">
                                                            VERIFIED
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : searchRollNo.length > 0 && !searchLoading ? (
                                                <div className="mt-2 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
                                                    <X size={14} /> Student not found with this Roll Number
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Obtained Marks</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    required
                                                    className="w-full p-4 text-center bg-gray-50 text-green-600 text-3xl rounded-2xl border-2 border-transparent focus:border-green-500 outline-none font-black transition-all"
                                                    value={resultForm.obtainedMarks}
                                                    onChange={e => setResultForm({ ...resultForm, obtainedMarks: Number(e.target.value) })}
                                                />
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                                                    / {resultForm.totalMarks}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submissionLoading}
                                            className="md:col-span-2 w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex justify-center gap-2 mt-4 shadow-lg active:scale-95"
                                        >
                                            {submissionLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                            Publish Marks
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity Table */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
                            <div className="p-8 border-b border-gray-50">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Submissions</h3>
                                <p className="text-gray-500 font-medium text-sm">Results you have published.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                                            <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                                            <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Details</th>
                                            <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Marks</th>
                                            <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {publishedResults.map((result, i) => (
                                            <tr key={result.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-5 text-xs font-bold text-gray-500">
                                                    {new Date(result.publishedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{result.studentName}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md uppercase tracking-wide">
                                                                {result.class}
                                                            </span>
                                                            <span className="text-[10px] font-bold text-gray-400">
                                                                #{result.rollNumber}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="font-bold text-gray-900 text-sm">{result.subjects[0]?.subjectName}</p>
                                                    <p className="text-xs text-gray-500">{result.title}</p>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-black text-center min-w-[3rem]">
                                                        {result.subjects[0]?.obtainedMarks}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-bold ml-1">/ {result.subjects[0]?.totalMarks}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button
                                                        onClick={() => handleDeleteResult(result.id)}
                                                        className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {publishedResults.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-medium">
                                                    No results published yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
