import {
    FlaskConical,
    Languages,
    BookText,
    Calculator,
    Globe2,
    Atom,
    Microscope,
    BookOpen,
} from "lucide-react"

export interface Teacher {
    name: string
    designation: string
    qualification: string
    image: string
    email: string
    phone: string
}

export interface Department {
    name: string
    icon: any
    color: string
    image: string
    description: string
    vision: string
    objectives: string[]
    teachers: Teacher[]
}

export const departmentsData: Record<string, Department> = {
    chemistry: {
        name: "Chemistry",
        icon: FlaskConical,
        color: "bg-purple-600",
        image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80",
        description: "The Chemistry Department is dedicated to providing comprehensive education in chemical sciences, combining theoretical knowledge with practical laboratory experience. Our state-of-the-art facilities and experienced faculty ensure students receive world-class education.",
        vision: "To be a center of excellence in chemical education and research, producing skilled chemists who contribute to scientific advancement and societal development.",
        objectives: [
            "Provide quality education in organic, inorganic, and physical chemistry",
            "Develop practical skills through hands-on laboratory experience",
            "Encourage research and innovation in chemical sciences",
            "Prepare students for careers in industry, research, and academia"
        ],
        teachers: [
            {
                name: "Nasima Shaheen",
                designation: "Professor & Head",
                qualification: "PhD in Organic Chemistry",
                image: "/Images/faculty/female-staff.jpeg",
                email: "sarah.ahmed@gdc.edu.pk",
                phone: "+92-300-1234567"
            },
            {
                name: "Shehla Amjad",
                designation: "Associate Professor",
                qualification: "PhD in Physical Chemistry",
                image: "/Images/faculty/female-staff.jpeg",
                email: "m.tariq@gdc.edu.pk",
                phone: "+92-300-2345678"
            },
            {
                name: "Eidal Khan",
                designation: "Assistant Professor",
                qualification: "M.Phil in Analytical Chemistry",
                image: "/Images/faculty/eidal-khan.jpeg",
                email: "fatima.khan@gdc.edu.pk",
                phone: "+92-300-3456789"
            },
            {
                name: "M.Asfandyar Anssari",
                designation: "Lecturer",
                qualification: "M.Sc Chemistry",
                image: "/Images/faculty/m-asfandyar-anssari.jpeg",
                email: "ali.hassan@gdc.edu.pk",
                phone: "+92-300-4567890"
            },
        ]
    },
    english: {
        name: "English",
        icon: BookText,
        color: "bg-blue-600",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
        description: "The English Department focuses on developing language proficiency, literary appreciation, and critical thinking skills. We offer comprehensive courses in English literature, linguistics, and communication skills.",
        vision: "To cultivate excellent communicators and critical thinkers who appreciate literature and use language effectively in global contexts.",
        objectives: [
            "Enhance students' reading, writing, and speaking skills",
            "Develop appreciation for English literature and poetry",
            "Build critical analysis and interpretation abilities",
            "Prepare students for professional communication"
        ],
        teachers: [
            {
                name: "Bushra Shaikh",
                designation: "Professor & Head",
                qualification: "PhD in English Literature",
                image: "/Images/faculty/female-staff.jpeg",
                email: "ayesha.malik@gdc.edu.pk",
                phone: "+92-301-1234567"
            },
            {
                name: "Shabana Malik",
                designation: "Associate Professor",
                qualification: "M.Phil in Linguistics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "james.wilson@gdc.edu.pk",
                phone: "+92-301-2345678"
            },
            {
                name: "Mudassir Siddiqui",
                designation: "Assistant Professor",
                qualification: "M.A English Literature",
                image: "/Images/faculty/mudassir-siddiqui.jpeg",
                email: "zainab.ali@gdc.edu.pk",
                phone: "+92-301-3456789"
            }
        ]
    },
    urdu: {
        name: "Urdu",
        icon: Languages,
        color: "bg-green-600",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
        description: "The Urdu Department preserves and promotes our rich literary heritage. We study classical and modern Urdu literature, poetry, and prose, connecting students with their cultural roots.",
        vision: "To be a leading center for Urdu language and literature, preserving our cultural heritage while embracing contemporary literary trends.",
        objectives: [
            "Teach classical and modern Urdu literature",
            "Develop creative writing skills in Urdu",
            "Preserve and promote Urdu language and culture",
            "Encourage research in Urdu linguistics and literature"
        ],
        teachers: [
            {
                name: "Durdana",
                designation: "Professor & Head",
                qualification: "PhD in Urdu Literature",
                image: "/Images/faculty/female-staff.jpeg",
                email: "naseem.akhtar@gdc.edu.pk",
                phone: "+92-302-1234567"
            },
            {
                name: "Marvi Bhutto",
                designation: "Associate Professor",
                qualification: "PhD in Classical Urdu Poetry",
                image: "/Images/faculty/female-staff.jpeg",
                email: "hamid.raza@gdc.edu.pk",
                phone: "+92-302-2345678"
            },
            {
                name: "Erum Abbas",
                designation: "Assistant Professor",
                qualification: "M.Phil Urdu",
                image: "/Images/faculty/female-staff.jpeg",
                email: "sadia.hussain@gdc.edu.pk",
                phone: "+92-302-3456789"
            }
        ]
    },
    islamiat: {
        name: "Islamiat",
        icon: BookOpen,
        color: "bg-emerald-600",
        image: "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Islamiat Department provides comprehensive Islamic education, covering Quranic studies, Hadith, Islamic history, and contemporary Islamic thought. We aim to develop moral and ethical values in students.",
        vision: "To nurture morally upright individuals with deep understanding of Islamic teachings and their application in modern life.",
        objectives: [
            "Teach Quranic interpretation and Hadith studies",
            "Develop understanding of Islamic history and civilization",
            "Promote ethical and moral values",
            "Bridge classical Islamic knowledge with contemporary issues"
        ],
        teachers: [
            {
                name: "Ali Imran",
                designation: "Professor & Head",
                qualification: "PhD in Islamic Studies",
                image: "/Images/faculty/ali-imran.jpeg",
                email: "abdul.qadir@gdc.edu.pk",
                phone: "+92-303-1234567"
            },
            {
                name: "Syed Younus",
                designation: "Associate Professor",
                qualification: "PhD in Quranic Studies",
                image: "/Images/faculty/syed-younus.jpeg",
                email: "bilal.ahmed@gdc.edu.pk",
                phone: "+92-303-2345678"
            },
        ]
    },
    mathematics: {
        name: "Mathematics",
        icon: Calculator,
        color: "bg-orange-600",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
        description: "The Mathematics Department offers rigorous training in pure and applied mathematics. We develop analytical thinking, problem-solving skills, and mathematical reasoning essential for various careers.",
        vision: "To be a center of excellence in mathematical education, producing skilled mathematicians and problem solvers.",
        objectives: [
            "Provide comprehensive education in pure and applied mathematics",
            "Develop logical reasoning and analytical skills",
            "Encourage mathematical research and innovation",
            "Prepare students for careers in education, research, and industry"
        ],
        teachers: [
            {
                name: "Prof. Idrees Ahmed",
                designation: "Professor & Head",
                qualification: "PhD in Pure Mathematics",
                image: "/Images/faculty/idrees-ahmed.jpeg",
                email: "imran.shah@gdc.edu.pk",
                phone: "+92-304-1234567"
            },
            {
                name: "Laraib",
                designation: "Associate Professor",
                qualification: "PhD in Applied Mathematics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "nadia.iqbal@gdc.edu.pk",
                phone: "+92-304-2345678"
            },
            {
                name: "Syed Ahsan Kamal",
                designation: "Assistant Professor",
                qualification: "M.Phil Mathematics",
                image: "/Images/faculty/syed-ahsan-kamal.jpeg",
                email: "kashif.mahmood@gdc.edu.pk",
                phone: "+92-304-3456789"
            },
        ]
    },
    physics: {
        name: "Physics",
        icon: Atom,
        color: "bg-indigo-600",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80",
        description: "The Physics Department explores the fundamental laws of nature through theoretical study and experimental investigation. Our modern laboratories provide hands-on experience with cutting-edge equipment.",
        vision: "To inspire scientific curiosity and develop physicists who contribute to technological advancement and scientific research.",
        objectives: [
            "Teach fundamental and advanced physics concepts",
            "Provide practical laboratory experience",
            "Encourage scientific research and experimentation",
            "Prepare students for careers in science and technology"
        ],
        teachers: [
            {
                name: "Rozina Naz",
                designation: "Professor & Head",
                qualification: "PhD in Theoretical Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "asad.mahmood@gdc.edu.pk",
                phone: "+92-305-1234567"
            },
            {
                name: "Hiba Haq",
                designation: "Associate Professor",
                qualification: "PhD in Nuclear Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "rabia.noor@gdc.edu.pk",
                phone: "+92-305-2345678"
            },
            {
                name: "Sana Ishrat",
                designation: "Assistant Professor",
                qualification: "M.Phil Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "usman.ali@gdc.edu.pk",
                phone: "+92-305-3456789"
            },
            {
                name: "Samra Sibtain",
                designation: "Assistant Professor",
                qualification: "M.Phil Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "usman.ali@gdc.edu.pk",
                phone: "+92-305-3456789"
            },
            {
                name: "Mehjabeen",
                designation: "Assistant Professor",
                qualification: "M.Phil Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "usman.ali@gdc.edu.pk",
                phone: "+92-305-3456789"
            },
            {
                name: "Shahana Mehar",
                designation: "Assistant Professor",
                qualification: "M.Phil Physics",
                image: "/Images/faculty/female-staff.jpeg",
                email: "usman.ali@gdc.edu.pk",
                phone: "+92-305-3456789"
            }
        ]
    },
    computerscience: {
        name: "Computer Science",
        icon: Microscope,
        color: "bg-teal-600",
        image: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Biology Department offers comprehensive study of life sciences, from molecular biology to ecology. Our well-equipped laboratories and experienced faculty provide excellent learning opportunities.",
        vision: "To be a leading center for biological sciences education, fostering scientific inquiry and environmental awareness.",
        objectives: [
            "Provide comprehensive education in biological sciences",
            "Develop practical skills through laboratory work",
            "Promote environmental awareness and conservation",
            "Prepare students for medical and research careers"
        ],
        teachers: [
            {
                name: "Ambreen Akbar",
                designation: "Professor & Head",
                qualification: "PhD in Molecular Biology",
                image: "/Images/faculty/female-staff.jpeg",
                email: "samina.yousaf@gdc.edu.pk",
                phone: "+92-306-1234567"
            },
            {
                name: "Alishbah Khan",
                designation: "Associate Professor",
                qualification: "PhD in Botany",
                image: "/Images/faculty/female-staff.jpeg",
                email: "farhan.malik@gdc.edu.pk",
                phone: "+92-306-2345678"
            },
        ]
    },
    pakistanstudies: {
        name: "Pakistan Studies",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
        description: "The Geography Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Tashkeel Ahmed",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/tashkeel-ahmed.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    },
    botany: {
        name: "Botany",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1558966151-762ec9755ce3?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Botany Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Shafique Ahmed",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/shafique-ahmed.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    },
    zoology: {
        name: "Zoology",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Zoology Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Dr. Muhammad Faheem",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/dr-faheem.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    },
    commerce: {
        name: "Commerce",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Commerce Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Ghulam Akbar",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/ghulam-akbar.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
            {
                name: "Usman Ali Mangrio",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/usman-ali-mangrio.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
            {
                name: "Aqsa Rao",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/female-staff.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
            {
                name: "Syed Salman Ali",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/syed-salman-ali.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    },
    economics: {
        name: " Economics",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Zoology Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Shujaat Hussain",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/shujaat-hussain.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    },
    statistics: {
        name: " Statistics",
        icon: Globe2,
        color: "bg-cyan-600",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "The Zoology Department studies Earth's physical features, climate patterns, and human-environment interactions. We combine fieldwork with classroom learning for comprehensive understanding.",
        vision: "To develop geographers who understand and address environmental and spatial challenges facing our world.",
        objectives: [
            "Teach physical and human geography",
            "Develop map reading and spatial analysis skills",
            "Promote environmental awareness",
            "Conduct field studies and research"
        ],
        teachers: [
            {
                name: "Shariq Zuberi",
                designation: "Professor & Head",
                qualification: "PhD in Physical Geography",
                image: "/Images/faculty/shariq-zuberi.jpeg",
                email: "zahid.hussain@gdc.edu.pk",
                phone: "+92-307-1234567"
            },
        ]
    }
}
