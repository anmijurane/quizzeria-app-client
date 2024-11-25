import { useEffect } from "react";
import {useQuestionaryStore, useSessionStore, useSubjectsStore} from "../store";

export const HomePage = () => {

  const actionsSession = useSessionStore();
  const actionsSubject = useSubjectsStore();
  const actionsQuestionary = useQuestionaryStore()

  useEffect(() => {
    console.log({ actionsSession, actionsSubject })
  })

  const handleSetSubject = async (subjectId: string) => {
    actionsSubject.setCurrentSubject(subjectId);
    await actionsQuestionary.getQuestions(subjectId);
  }

  return (
    <div>
      <button onClick={() => actionsSession.login('anmijurane1@gmail.com', 'Rn@i8Adf2')}>Login</button>
      <button onClick={() => actionsSession.logout()}>Logout</button>
      <hr/>

      <button onClick={() => actionsSubject.getSubjects()}>getSubjects</button>

      <hr/>
      {
        actionsSubject.items.map((subject) =>
          <button
            key={subject.id}
            onClick={() => handleSetSubject(subject.id)}
          >
            {subject.name}
          </button>
        )
      }
      <hr/>
      {
        actionsQuestionary.items.map((question) => {
          return (
            <>
              <ul key={question.id}>
                <li>{question.text}</li>
                <button
                  onClick={() => actionsQuestionary.getAnswers(question.id)}
                >Ver respuestas
                </button>
              </ul>
              {question?.answers && question.answers.length > 0 && question.answers.map((answer) => {
                return (
                  <button onClick={() => actionsQuestionary.setAnswerSelected(question.id, answer.id)}>{answer.text}</button>
                )
              })}
            </>
          )
        })
      }
    </div>
  );
};
