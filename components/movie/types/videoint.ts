export interface Video {
  id: number;
  title: string;
  youtubeId: string;
  description: string;
  thumbnail: string;
  level: string;
  views: string;
  likes: string;
  date: string;
  category?: string;
  instructor?: string;
  rating?: number;
}