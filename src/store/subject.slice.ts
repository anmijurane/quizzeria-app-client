import {create} from "zustand";
import {Subject, SubjectSlice, SubjectState} from "../interfaces/subject.ts";
import {HTTP} from "../Http/AxiosInstance.ts";

const initialStateSubject:SubjectState = {
  items: [],
  length: 0,
  current: {
    id: '',
    description: '',
    name: '',
    status: '',
  },
}

export const useSubjectsStore = create<SubjectSlice>((set, get) => ({
  ...initialStateSubject,
  getSubjects: async () => {
    const response = await HTTP.GET<Subject[]>(`api/subjects`)
    set({
      items: response.data,
      length: response.data.length,
    })
  },
  setCurrentSubject: (id: string) => {
    const state = get();
    const current = state.items.find((item) => item.id === id);
    set({ current: current || initialStateSubject.current });
  },
}));
