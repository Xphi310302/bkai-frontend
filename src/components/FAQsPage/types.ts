export interface FAQ {
  faq_id: string;
  question: string;
  answer: string;
  file_id: string;
  verify: boolean;
}

export interface Document {
  id: string;
  name: string;
  url: string;
}