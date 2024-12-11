import { useEffect } from "react";
import { useSessionStore, useSubjectsStore } from "../store";
import { ProtectedLayout } from "@src/layouts/Protected";

export const HomePage = () => {

  const actionsSession = useSessionStore();
  const subjectItems = useSubjectsStore(state => state.items);
  const getSubjects = useSubjectsStore(state => state.getSubjects);
  // const actionsQuestionary = useQuestionaryStore()

  useEffect(() => {
    console.log({ actionsSession, subjectItems })
  });

  // const handleSetSubject = async (subjectId: string) => {
  //   actionsSubject.setCurrentSubject(subjectId);
  //   await actionsQuestionary.getQuestions(subjectId);
  // }

  useEffect(() => {
    const init = async () => {
      await getSubjects();
    }
    init();
  }, [getSubjects])

  return (
    <ProtectedLayout>
      <div className="bg-white shadow">
        <div className="mx-auto max-v-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Elije un questionario</h1>
        </div>
      </div>
      <div className="bg-white shadow">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 my-10 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-1">
            {subjectItems.map((subject) => (
              <div className="group relative">
                <h2 className="text-2xl text-gray-700">{subject.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};
