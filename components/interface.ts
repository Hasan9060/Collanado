export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  category: string;
  level: string;
  pages: number;
  rating: number;
  reviews: number;
  isPaid: boolean;
  price: number;
  downloadCount: number;
  uploadedDate: string;
}

export interface PaymentCode {
  code: string;
  bookId: string;
  used: boolean;
  usedBy: string | null;
  usedAt: string | null;
  expiresAt: string;
}