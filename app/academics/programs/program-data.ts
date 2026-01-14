export const programsData = {
    bsc: {
        title: "B.S.C",
        fullName: "Associate Degree in Science",
        tagline: "Your Path towards Success Begins at GDCMC",
        introduction: "B.Sc offers specialized education in the subjects including Physics, Chemistry, Mathematics, Stats, Botany and Zoology.",
        compulsory: ["Urdu", "English", "Pakistan Studies"],
        electiveGroups: [
            "Zoology, Botany, Chemistry",
            "Maths A, Maths B, Physics",
            "Maths A, Maths B, Stats",
            "Stats, Maths, Comp Science",
            "Stats, Maths, Economics"
        ],
        eligibility: "The duration of the program is two years. The University conducts terminal examinations for 1st year and 2nd year separately.",
        bgImage: "https://images.unsplash.com/photo-1532094349884-543bb1178c75?auto=format&fit=crop&q=80"
    },
    adc: {
        title: "A.D.C",
        fullName: "Associate Degree in Commerce",
        tagline: "Building the Future of Business and Finance",
        introduction: "The Associate Degree in Commerce (ADC) provides a strong foundation in accounting, business mathematics, and economic development, preparing students for the corporate world.",
        compulsory: ["Islamic Studies / Ethics", "Pakistan Studies", "Functional English", "Introduction to Business"],
        electiveGroups: [
            "Principles of Accounting",
            "Business Mathematics and Statistics",
            "Principles of Management",
            "Advanced Accounting",
            "Auditing and Income Tax Law"
        ],
        eligibility: "Two-year degree program. Students who have cleared HSSC (Commerce/Science) or equivalent are eligible for admission.",
        bgImage: "https://images.unsplash.com/photo-1454165833761-121583e2a121?auto=format&fit=crop&q=80"
    }
};

export type ProgramSlug = keyof typeof programsData;
