import { Button } from "@src/components/ui/button";
import { ProtectedLayout } from "@src/layouts/Protected";
import { useQuestionaryStore, useSubjectsStore } from "@src/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Questionary = () => {

  const navigate = useNavigate()

  const initQuestionary = useQuestionaryStore(state => state.initQuestionary)
  const subject = useSubjectsStore(state => state.current);

  useEffect(() => {
    if (!subject.id) {
      navigate('/');
    }
  }, [navigate, subject]);

  const handleInitQuestionary = async () => {
    const firstQuestionId = await initQuestionary(subject.id);
    navigate(`/question/${firstQuestionId}`);
  }

  return (
    <ProtectedLayout>
      <div className="min-w-min min-h-96 flex flex-col justify-around p-10">
        <div className="flex mx-auto max-v-7xl px-4 py-6 sm:px-6 lg:px-8 justify-center items-center flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-3">{subject.name}</h1>
          <p>{subject.description}</p>
        </div>

        <div className="flex justify-center items-center">
          <Button variant='destructive' onClick={handleInitQuestionary}>Iniciar</Button>
        </div>

      </div>
    </ProtectedLayout>
  );
};
