"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    User,
    LogOut,
    GraduationCap,
    Bell,
    Menu,
    X,
    Loader2,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Hash,
    ShieldCheck,
    BookOpen,
    Inbox,
    Award,
    ChevronDown,
    ChevronUp,
    FileText
} from "lucide-react";
import Link from "next/link";


const SUBJECTS_DATA: Record<string, string[]> = {
    "Pre-Medical": ["Biology", "Physics", "Chemistry", "English", "Urdu", "Islamiat/Pak Studies"],
    "Pre-Engineering": ["Mathematics", "Physics", "Chemistry", "English", "Urdu", "Islamiat/Pak Studies"],
    "Computer Science": ["Computer Science", "Mathematics", "Physics", "English", "Urdu", "Islamiat/Pak Studies"],
    "Commerce": ["Principles of Accounting", "Principles of Commerce", "Economics", "Business Math", "English", "Urdu", "Islamiat/Pak Studies"]
};

const themes = {
    "Pre-Medical": {
        primary: "bg-green-600",
        secondary: "bg-green-50",
        accent: "text-green-600",
        border: "border-green-100",
        hover: "hover:bg-green-700",
        light: "bg-green-100",
        gradient: "from-green-600 to-green-400"
    },
    "Pre-Engineering": {
        primary: "bg-blue-800",
        secondary: "bg-blue-50",
        accent: "text-blue-800",
        border: "border-blue-100",
        hover: "hover:bg-blue-900",
        light: "bg-blue-100",
        gradient: "from-blue-800 to-blue-600"
    },
    "Computer Science": {
        primary: "bg-[#800000]",
        secondary: "bg-red-50",
        accent: "text-[#800000]",
        border: "border-red-100",
        hover: "hover:bg-[#600000]",
        light: "bg-red-100",
        gradient: "from-[#800000] to-[#a00000]"
    },
    "Commerce": {
        primary: "bg-[#7B3F00]",
        secondary: "bg-orange-50",
        accent: "text-[#7B3F00]",
        border: "border-orange-100",
        hover: "hover:bg-[#5D2E00]",
        light: "bg-orange-100",
        gradient: "from-[#7B3F00] to-[#964B00]"
    },
};

export default function StudentProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [news, setNews] = useState<any[]>([]);
    const [examResults, setExamResults] = useState<any[]>([]);
    const [expandedResult, setExpandedResult] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const query = `*[_type == "news"] | order(publishedAt desc) [0...10] {
                    _id,
                    title,
                    description,
                    publishedAt
                }`;
                const data = await client.fetch(query);
                setNews(data);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (profile?.rollNumber) {
                try {
                    const resultsQuery = query(
                        collection(db, "results"),
                        where("rollNumber", "==", profile.rollNumber),
                        orderBy("publishedAt", "desc")
                    );
                    const querySnapshot = await getDocs(resultsQuery);
                    const resultsData = querySnapshot.docs.map(doc => ({
                        _id: doc.id,
                        ...doc.data(),
                        // Ensure subjects is an array just in case
                        subjects: doc.data().subjects ? JSON.parse(doc.data().subjects) : []
                    }));
                    setExamResults(resultsData);
                } catch (error) {
                    // Try without ordering if index is missing
                    try {
                        const simpleQuery = query(
                            collection(db, "results"),
                            where("rollNumber", "==", profile.rollNumber)
                        );
                        const simpleSnapshot = await getDocs(simpleQuery);
                        let resultsData = simpleSnapshot.docs.map(doc => ({
                            _id: doc.id,
                            ...doc.data(),
                            subjects: doc.data().subjects ? JSON.parse(doc.data().subjects) : []
                        }));
                        // Client side sort
                        resultsData.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
                        setExamResults(resultsData);
                    } catch (e) {
                        console.error("Failed to fetch results:", e);
                    }
                }
            }
        };
        fetchResults();
    }, [profile]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "students", user.uid));
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

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/portal/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    const dept = profile?.department || "Pre-Engineering";
    const theme = themes[dept as keyof typeof themes] || themes["Pre-Engineering"];
    const subjects = SUBJECTS_DATA[dept as keyof typeof SUBJECTS_DATA] || [];

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
                            <img
                                src="/Images/logo.png" alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-black text-xl tracking-tight">GDCMC PORTAL</h2>
                            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">{profile?.department}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-full border-2 border-white/30 overflow-hidden shadow-xl">
                            <img
                                src={profile?.image || `https://ui-avatars.com/api/?name=${profile?.name}&background=fff&color=000&bold=true`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm truncate w-32">{profile?.name}</p>
                            <p className="text-xs opacity-70 truncate w-32">{profile?.rollNumber}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2 mt-4">
                    <button
                        onClick={() => { setActiveTab("profile"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold 
                        ${activeTab === "profile" ? `${theme.light} ${theme.accent}` : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <User size={22} />
                        <span className="text-sm uppercase tracking-wide">My Profile</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab("subjects"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold 
                        ${activeTab === "subjects" ? `${theme.light} ${theme.accent}` : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <BookOpen size={22} />
                        <span className="text-sm uppercase tracking-wide">Subjects</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab("news"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold 
                        ${activeTab === "news" ? `${theme.light} ${theme.accent}` : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <Inbox size={22} />
                        <span className="text-sm uppercase tracking-wide">Updates</span>
                    </button>

                    <button
                        onClick={() => { setActiveTab("results"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold 
                        ${activeTab === "results" ? `${theme.light} ${theme.accent}` : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                        <Award size={22} />
                        <span className="text-sm uppercase tracking-wide">Results</span>
                    </button>

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
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 shrink-0">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Student Portal</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl">
                            <Bell size={20} className="text-gray-600" />
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto w-full flex-1">
                    {activeTab === "profile" && (
                        <>
                            {/* Identity Header Card */}
                            <div className={`relative overflow-hidden rounded-[3rem] p-8 md:p-12 text-white bg-gradient-to-br ${theme.gradient} shadow-2xl mb-8`}>
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white p-2 shadow-2xl transition-transform duration-500 overflow-hidden">
                                        <div className="w-full h-full rounded-full overflow-hidden">
                                            <img
                                                src={profile?.image || `https://ui-avatars.com/api/?name=${profile?.name}&size=200`}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                                            <span className="px-4 py-1.5 bg-green-500/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                                                Status: Active
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black mb-2  uppercase leading-none">{profile?.name}</h2>
                                        <p className="text-xl md:text-2xl font-bold opacity-80 mb-6 uppercase tracking-tight">S/O {profile?.fatherName}</p>

                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-black/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                                                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Roll Number</p>
                                                <p className="font-bold text-lg">{profile?.rollNumber}</p>
                                            </div>
                                            <div className="bg-black/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                                                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Faculty</p>
                                                <p className="font-bold text-lg">{profile?.department}</p>
                                            </div>
                                            <div className="bg-black/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                                                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Batch</p>
                                                <p className="font-bold text-lg">2024-2026</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                        <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
                                            <ShieldCheck className={theme.accent} size={28} />
                                            Academic Verification
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                                <div className={`w-14 h-14 ${theme.light} ${theme.accent} rounded-2xl flex items-center justify-center`}>
                                                    <Mail size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                                    <p className="font-bold text-gray-900 truncate w-40">{profile?.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                                <div className={`w-14 h-14 ${theme.light} ${theme.accent} rounded-2xl flex items-center justify-center`}>
                                                    <Hash size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student ID</p>
                                                    <p className="font-bold text-gray-900 italic">#{profile?.uid?.slice(0, 8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                                <div className={`w-14 h-14 ${theme.light} ${theme.accent} rounded-2xl flex items-center justify-center`}>
                                                    <Calendar size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reg. Date</p>
                                                    <p className="font-bold text-gray-900">{new Date(profile?.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                                <div className={`w-14 h-14 ${theme.light} ${theme.accent} rounded-2xl flex items-center justify-center`}>
                                                    <MapPin size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Campus</p>
                                                    <p className="font-bold text-gray-900">Malir Cantt, KHI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center">
                                        <div className="mb-6 mx-auto w-32 h-32 bg-gray-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-200">
                                            <div className="qr-code-placeholder text-gray-300 font-black text-center text-xs leading-none">
                                                QR CODE<br />COMING<br />SOON
                                            </div>
                                        </div>
                                        <h4 className="font-black text-gray-900 mb-2 uppercase text-sm">Security QR</h4>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed px-4">
                                            Scan this code during college entry for instant authentication.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "subjects" && (
                        <div className="space-y-8">
                            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 ${theme.light} ${theme.accent} rounded-full flex items-center justify-center`}>
                                        <BookOpen size={30} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Your Syllabus</h3>
                                        <p className="text-gray-500">Subjects for {profile?.department}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subjects.map((subj, idx) => (
                                        <div key={idx} className="group hover:bg-gray-50 transition-colors p-6 rounded-[2rem] border border-gray-100 flex items-start gap-4 cursor-default">
                                            <div className={`w-10 h-10 ${theme.light} ${theme.accent} rounded-xl flex items-center justify-center shrink-0`}>
                                                <span className="font-black text-sm">{idx + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">{subj}</h4>
                                            </div>
                                        </div>
                                    ))}
                                    {subjects.length === 0 && (
                                        <p className="text-gray-500 col-span-full text-center py-10">
                                            No subjects found for this department. Please contact admin.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "news" && (
                        <div className="space-y-8">
                            <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 ${theme.light} ${theme.accent} rounded-full flex items-center justify-center`}>
                                        <Inbox size={30} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">News & Alerts</h3>
                                        <p className="text-gray-500">Latest updates from the college administration</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {news.map((item: any) => (
                                        <Link href="/news" key={item._id} className="block group">
                                            <div className="flex items-start md:items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 cursor-pointer">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${theme.secondary} ${theme.accent}`}>
                                                    <Bell size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                        <h4 className="font-bold text-gray-900 text-base md:text-lg truncate group-hover:text-blue-700 transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <span className="text-[10px] md:text-xs font-bold text-gray-400 shrink-0 uppercase tracking-wider">
                                                            {new Date(item.publishedAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate font-medium">
                                                        {item.description || "Click to read more details about this announcement..."}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="h-px bg-gray-50 ml-20 my-1 group-last:hidden"></div>
                                        </Link>
                                    ))}
                                    {news.length === 0 && (
                                        <div className="text-center py-12">
                                            <Bell className="mx-auto text-gray-300 mb-4" size={48} />
                                            <p className="text-gray-500 font-medium">No new notifications at the moment.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "results" && (
                        <div className="space-y-8">
                            <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 ${theme.light} ${theme.accent} rounded-full flex items-center justify-center`}>
                                        <Award size={30} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Exam Results</h3>
                                        <p className="text-gray-500">Academic performance and grade cards</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {examResults.map((result: any) => (
                                        <div key={result._id} className="border border-gray-100 rounded-[2rem] overflow-hidden bg-gray-50">
                                            <div
                                                onClick={() => setExpandedResult(expandedResult === result._id ? null : result._id)}
                                                className="p-6 cursor-pointer flex items-center justify-between hover:bg-white transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.light} ${theme.accent}`}>
                                                        <FileText size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-lg">{result.title}</h4>
                                                        <p className="text-sm text-gray-500 font-medium">Published: {new Date(result.publishedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className={`p-2 rounded-full ${theme.light} ${theme.accent}`}>
                                                    {expandedResult === result._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </div>
                                            </div>

                                            {expandedResult === result._id && (
                                                <div className="px-6 pb-6 bg-white border-t border-gray-100 animate-in slide-in-from-top-2">
                                                    <div className="mt-6 overflow-x-auto">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="text-left">
                                                                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest pl-4">Subject</th>
                                                                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Total</th>
                                                                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Obtained</th>
                                                                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Grade</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="space-y-2">
                                                                {result.subjects?.map((sub: any, idx: number) => (
                                                                    <tr key={idx} className="bg-gray-50/50 rounded-xl">
                                                                        <td className="py-3 pl-4 font-bold text-gray-700 text-sm rounded-l-xl">{sub.subjectName}</td>
                                                                        <td className="py-3 text-center font-bold text-gray-500 text-sm">{sub.totalMarks}</td>
                                                                        <td className="py-3 text-center font-black text-gray-900 text-sm">{sub.obtainedMarks}</td>
                                                                        <td className="py-3 text-center rounded-r-xl">
                                                                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black ${['A+', 'A'].includes(sub.grade) ? 'bg-green-100 text-green-700' :
                                                                                ['B', 'C'].includes(sub.grade) ? 'bg-blue-100 text-blue-700' :
                                                                                    ['D'].includes(sub.grade) ? 'bg-yellow-100 text-yellow-700' :
                                                                                        'bg-red-100 text-red-700'
                                                                                }`}>
                                                                                {sub.grade}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td colSpan={4} className="pt-6">
                                                                        <div className="flex justify-end gap-6 items-center">
                                                                            <div className="text-right">
                                                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                                                                                <p className="text-xl font-black text-gray-900">
                                                                                    {result.subjects?.reduce((acc: number, curr: any) => acc + (Number(curr.obtainedMarks) || 0), 0)}
                                                                                    <span className="text-sm text-gray-400 font-bold ml-1">/ {result.subjects?.reduce((acc: number, curr: any) => acc + (Number(curr.totalMarks) || 0), 0)}</span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Percentage</p>
                                                                                <p className={`text-xl font-black ${theme.accent}`}>
                                                                                    {((result.subjects?.reduce((acc: number, curr: any) => acc + (Number(curr.obtainedMarks) || 0), 0) /
                                                                                        result.subjects?.reduce((acc: number, curr: any) => acc + (Number(curr.totalMarks) || 0), 0)) * 100).toFixed(1)}%
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {examResults.length === 0 && (
                                        <div className="text-center py-12">
                                            <Award className="mx-auto text-gray-300 mb-4" size={48} />
                                            <p className="text-gray-500 font-medium">No results found for your roll number.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {
                sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                )
            }
        </div >
    );
}
