import { useEffect } from "react";
import { useSessionStore, useSubjectsStore } from "../store";
import { ProtectedLayout } from "@src/layouts/Protected";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Badge } from "@ui/badge";
import { Button } from "@src/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Subject } from "@interfaces/subject";

export const HomePage = () => {

  const navigate = useNavigate();
  const checkSession = useSessionStore(state => state.checkSession);
  const subjectItems = useSubjectsStore(state => state.items);
  const setCurrentSubject = useSubjectsStore(state => state.setCurrentSubject);
  const getSubjects = useSubjectsStore(state => state.getSubjects);

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await getSubjects();
    }
    init();
  }, []);

  const initialQuestionary = (subject: Pick<Subject, 'id'>) => {
    setCurrentSubject(subject.id);
    navigate(`/quiz/${subject.id}`);
  }

  return (
    <ProtectedLayout>
      <div className="bg-white shadow">
        <div className="mx-auto max-v-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Elije un questionario</h1>
        </div>
      </div>
      <div className="bg-white shadow">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 my-10 lg:grid lg:grid-cols-2 lg:gap-x-6">
            {subjectItems.map((subject) => (
              <Card key={subject.id} className="m-4">
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl font-normal text-black">
                      {subject.name}
                    </h2>
                  </CardTitle>
                  <CardDescription>
                    <Badge variant='destructive'>{subject.status}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end bg-gray-700 h-3">
                  <Button
                    variant='link'
                    onClick={() => initialQuestionary(subject)}
                    className="text-white text-1xl uppercase"
                  >
                    Iniciar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};
