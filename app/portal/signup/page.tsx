"use client";

import { useState, Suspense } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc, getDocs, query, collection, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    User, GraduationCap, Lock, Mail, ArrowRight, Loader2, BookOpen, Fingerprint,
    Camera, Hash, CreditCard, Phone, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

function SignupForm() {
    const searchParams = useSearchParams();
    const initialRole = (searchParams.get("role") as "student" | "teacher") || "student";

    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [cnic, setCnic] = useState("");
    const [phone, setPhone] = useState("03");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"student" | "teacher">(initialRole);
    const [department, setDepartment] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Limit image size to ~1MB
            if (file.size > 1024 * 1024) {
                toast.error("Image size too large. Please select an image under 1MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 13) val = val.substring(0, 13);

        if (val.length > 12) {
            val = val.substring(0, 5) + '-' + val.substring(5, 12) + '-' + val.substring(12, 13);
        } else if (val.length > 5) {
            val = val.substring(0, 5) + '-' + val.substring(5);
        }
        setCnic(val);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        // Enforce 03 prefix
        if (!val.startsWith("03")) {
            val = "03" + val.replace(/^03/, '');
        }
        if (val.length <= 11) {
            setPhone(val);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!name || !email || !password || !phone || !cnic) {
            toast.error("Please fill all fields");
            return;
        }

        if (phone.length !== 11) {
            toast.error("Phone number must be 11 digits (03XXXXXXXXX)");
            return;
        }

        if (role === "student" && (!department || !fatherName || !rollNumber)) {
            toast.error("Please fill all student details");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Authentication User FIRST (To establish Identity & Permissions)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            try {
                // 2. NOW Check for Duplicate CNIC or Roll Number (With Permission)
                const studentsRef = collection(db, "students");

                // Check CNIC
                const cnicQuery = query(studentsRef, where("cnic", "==", cnic));
                const cnicSnapshot = await getDocs(cnicQuery);
                if (!cnicSnapshot.empty) {
                    throw new Error("This CNIC is already registered.");
                }

                if (role === "student") {
                    // Check Roll Number (Only for students)
                    const rollQuery = query(studentsRef, where("rollNumber", "==", rollNumber));
                    const rollSnapshot = await getDocs(rollQuery);
                    if (!rollSnapshot.empty) {
                        throw new Error("This Roll Number is already registered.");
                    }
                }

                // 3. Save Data to Firestore
                const userData: any = {
                    uid: user.uid,
                    name,
                    email,
                    phone,
                    cnic,
                    role,
                    image: imagePreview || "", // Use Base64 directly
                    createdAt: new Date().toISOString(),
                };

                if (role === "student") {
                    userData.department = department;
                    userData.fatherName = fatherName;
                    userData.rollNumber = rollNumber;
                }

                await setDoc(doc(db, role === "student" ? "students" : "teachers", user.uid), userData);

                toast.success("Account created successfully!");
                router.replace(`/portal/${role}`);

            } catch (innerError: any) {
                // If DB checks fail, DELETE the user we just created to rollback
                await user.delete();
                throw innerError; // Re-throw to main catch
            }

        } catch (error: any) {
            console.error("Signup Error:", error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already in use.");
            } else if (error.message.includes("CNIC") || error.message.includes("Roll Number")) {
                toast.error(error.message);
            } else if (error.code === 'permission-denied') {
                toast.error("Database Permission Error. Please check Firestore Rules.");
            } else {
                toast.warning(error.message || "Signup failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#800000] flex items-center justify-center p-4 py-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-white/20 relative">
                    <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#800000] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg transform rotate-3">
                            {role === "student" ? <GraduationCap className="text-white" size={32} /> : <User className="text-white" size={32} />}
                        </div>
                        <h1 className="text-3xl font-black text-[#800000] mb-2 tracking-tight">JOIN PORTAL</h1>
                        <p className="text-gray-500 font-medium">Create your account to get started</p>
                    </div>

                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
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

                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* Image Upload */}
                        <div className="flex justify-center mb-6">
                            <label className="relative cursor-pointer group">
                                <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-dashed border-[#800000]/20 group-hover:border-[#800000]/40 transition-all flex items-center justify-center bg-[#800000]/5">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="text-[#800000]/40 group-hover:text-[#800000] transition-colors" size={32} />
                                    )}
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                <div className="absolute -bottom-2 -right-2 bg-[#800000] p-2 rounded-xl text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={14} />
                                </div>
                            </label>
                        </div>

                        <div className="relative group">
                            <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="CNIC Number (e.g. 42101-1234567-1)"
                                value={cnic}
                                onChange={handleCnicChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                            />
                        </div>

                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Phone Number (03XXXXXXXXX)"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                            />
                        </div>

                        {role === "student" && (
                            <>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Father's Name"
                                        value={fatherName}
                                        onChange={(e) => setFatherName(e.target.value)}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Roll Number (e.g. GDC-123)"
                                        value={rollNumber}
                                        onChange={(e) => setRollNumber(e.target.value)}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#800000]/30 focus:bg-white focus:ring-4 focus:ring-[#800000]/5 transition-all font-medium appearance-none"
                                    >
                                        <option value="" disabled>Select Faculty</option>
                                        <option value="Pre-Medical">Pre-Medical</option>
                                        <option value="Pre-Engineering">Pre-Engineering</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Commerce">Commerce</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#800000] transition-colors" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    CREATE ACCOUNT
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 text-sm font-medium">
                        Already have an account?{" "}
                        <Link
                            href="/portal/login"
                            className={`font-bold transition-colors ${role === "student" ? "text-[#800000] hover:underline" : "text-red-600 hover:underline"}`}
                        >
                            Login Instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function PortalSignup() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#800000] flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={48} />
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}
