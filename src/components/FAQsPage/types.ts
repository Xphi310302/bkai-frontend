export interface FAQ {
  faq_id: string;
  question: string;
  answer: string;
  file_id: string;
  is_source: boolean;
  created: string;
  modified: string;
  deleted: boolean;
}

export interface Document {
  id: string;
  name: string;
  url: string;
}