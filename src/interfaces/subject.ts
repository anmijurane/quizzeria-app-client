export interface Subject {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface SubjectState {
  items: Subject[];
  length: number;
  current: Subject;
}

export interface SubjectActions {
  getSubjects: () => Promise<void>;
  setCurrentSubject: (subjectId: string) => void;
}

export type SubjectSlice = SubjectState & SubjectActions;
