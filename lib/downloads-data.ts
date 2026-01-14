import {
    FileText, ClipboardList, Award, BookMarked,
    Shield, FileCheck, Copy, UserCheck
} from "lucide-react";

export const downloadCategories = [
    {
        title: "BIEK Forms",
        description: "Official forms for Board of Intermediate Education Karachi.",
        items: [
            { name: "Certificate Form", href: "/downloads/certificate", icon: FileText },
            { name: "Scrutiny Form", href: "/downloads/scrutiny", icon: ClipboardList },
            { name: "Provisional Certification Form", href: "/downloads/provisional-certificate", icon: Award },
            { name: "Migration Form", href: "/downloads/migration", icon: BookMarked },
            { name: "Registration Form Commerce", href: "/downloads/registration-commerce", icon: FileText },
            { name: "Registration Form Humanities", href: "/downloads/registration-humanities", icon: FileText },
        ]
    },
    {
        title: "Verification & Cancellation",
        description: "Forms for academic document verification and enrollment cancellation.",
        items: [
            { name: "Verification Certificate Form", href: "/downloads/verification-certificate", icon: Shield },
            { name: "Verification Provisional Certificate", href: "/downloads/verification-provisional", icon: Shield },
            { name: "Verification Marksheet Form", href: "/downloads/verification-marksheet", icon: Shield },
            { name: "Verification Migration Form", href: "/downloads/verification-migration", icon: Shield },
            { name: "Cancellation Of Enrolment", href: "/downloads/cancellation-enrolment", icon: FileCheck },
            { name: "Cancellation Of Registration", href: "/downloads/cancellation-registration", icon: FileCheck },
        ]
    },
    {
        title: "Duplicate & Other Forms",
        description: "Request for duplicate documents and other specialized forms.",
        items: [
            { name: "Duplicate Marksheet", href: "/downloads/duplicate-marksheet", icon: Copy },
            { name: "Duplicate Enrolment Card", href: "/downloads/duplicate-enrolment-card", icon: Copy },
            { name: "Duplicate Computerized Admit Card", href: "/downloads/duplicate-computerized-admit-card", icon: Copy },
            { name: "Duplicate Registration Card", href: "/downloads/duplicate-registration-card", icon: Copy },
            { name: "Duplicate Manual Admit Card", href: "/downloads/duplicate-manual-admit-card", icon: Copy },
            { name: "Profirma Of Special Chance", href: "/downloads/profirma-special-chance", icon: FileText },
            { name: "Improvement Of Division", href: "/downloads/improvement-division", icon: Award },
            { name: "Registration Of All Groups", href: "/downloads/registration-all-groups", icon: UserCheck },
            { name: "Examination Forms", href: "/downloads/examination-forms", icon: ClipboardList },
            { name: "Permission Forms", href: "/downloads/permission-forms", icon: FileCheck },
        ]
    }
];
