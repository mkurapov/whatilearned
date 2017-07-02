export interface SubEntry {
  id: number;
  text: string;
  isHighlighted?: boolean;
}

export interface Entry {
  id: number;
  body: SubEntry[];
  date: Date;
}

