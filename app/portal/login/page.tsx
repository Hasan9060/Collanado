"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, GraduationCap, Lock, Mail, ArrowRight, Loader2, CreditCard, Hash, Fingerprint, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function PortalLogin() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"student" | "teacher">("student");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let loginEmail = identifier;

            // If identifier is NOT an email, we need to find the email associated with the CNIC or Roll No
            if (!identifier.includes("@")) {
                const collectionRef = collection(db, role === "student" ? "students" : "teachers");

                // 1. Try finding by CNIC
                let q = query(collectionRef, where("cnic", "==", identifier));
                let snapshot = await getDocs(q);

                // 2. If not found and it's a student, try finding by Roll Number
                if (snapshot.empty && role === "student") {
                    q = query(collectionRef, where("rollNumber", "==", identifier));
                    snapshot = await getDocs(q);
                }

                if (snapshot.empty) {
                    throw new Error(`No account found with this ${role === "student" ? "CNIC or Roll Number" : "CNIC"}`);
                }

                loginEmail = snapshot.docs[0].data().email;
            }

            // Proceed with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
            const user = userCredential.user;

            // Check user role in Firestore
            const userDoc = await getDoc(doc(db, role === "student" ? "students" : "teachers", user.uid));

            if (userDoc.exists()) {
                toast.success(`Welcome back, ${userDoc.data().name}!`);
                router.push(`/portal/${role}`);
            } else {
                const otherRole = role === "student" ? "teacher" : "student";
                const otherDoc = await getDoc(doc(db, otherRole === "student" ? "students" : "teachers", user.uid));
                if (otherDoc.exists()) {
                    toast.error(`Please select the correct role: ${otherRole.charAt(0).toUpperCase() + otherRole.slice(1)}`);
                } else {
                    toast.error("User profile not found. Please contact admin.");
                }
                await auth.signOut();
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                toast.error("Invalid Credentials. Please check your inputs.");
            } else if (error.code === 'auth/user-not-found') {
                toast.error("Account not found. Please Sign Up.");
            } else {
                toast.error(error.message || "Failed to login");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#800000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white/20 relative">
                    <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#800000] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg transform rotate-3">
                            <GraduationCap className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-[#800000] mb-2 tracking-tight">PORTAL LOGIN</h1>
                        <p className="text-gray-500 font-medium">Access your GDC Dashboard</p>
                    </div>

                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
                        <button
                            onClick={() => setRole("student")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold ${role === "student" ? "bg-white text-[#800000] shadow-md scale-[1.02]" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <GraduationCap size={20} />
                            <span className="uppercase tracking-wider text-xs">Student</span>
                        </button>
                        <button
                            onClick={() => setRole("teacher")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold ${role === "teacher" ? "bg-white text-red-600 shadow-md scale-[1.02]" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <User size={20} />
                            <span className="uppercase tracking-wider text-xs">Teacher</span>
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors flex items-center justify-center w-5">
                                {identifier.includes("@") ? <Mail size={20} /> : (role === 'student' && identifier.startsWith('GDC') ? <Hash size={20} /> : <CreditCard size={20} />)}
                            </div>
                            <input
                                type="text"
                                placeholder={role === "student" ? "Email, CNIC or Roll No" : "Email or CNIC"}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ${role === "student" ? "bg-[#800000] hover:bg-[#600000]" : "bg-red-600 hover:bg-red-700"
                                }`}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    LOGIN TO PORTAL
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 text-sm font-medium">
                        Don't have an account?{" "}
                        <Link
                            href={`/portal/signup?role=${role}`}
                            className={`font-bold transition-colors ${role === "student" ? "text-[#800000] hover:underline" : "text-red-600 hover:underline"}`}
                        >
                            Sign Up Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
