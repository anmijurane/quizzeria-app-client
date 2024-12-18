import {useQuestionaryStore} from "@src/store";
import {ProtectedLayout} from "@src/layouts/Protected.tsx";
import {Button} from "@ui/button.tsx";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Progress} from "@ui/progress.tsx";

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const AnswerQuestionary = () => {
  const navigate = useNavigate();
  const currentQuestion = useQuestionaryStore(state => state.current);
  useEffect(() => {
    if (!currentQuestion.id) {
      navigate('/');
    }
  }, [navigate, currentQuestion]);
  const pointer = useQuestionaryStore(state => state.pointer);

  const nextQuestion = useQuestionaryStore(state => state.nextQuestion);
  const setAnswerSelected = useQuestionaryStore(state => state.setAnswerSelected);

  const [answersFormat, setAnswersFormat] = useState(currentQuestion?.answers?.map(answer => ({
    ...answer,
    selected: false
  })) || []);

  useEffect(() => {
    if (currentQuestion?.answers) {
      setAnswersFormat(currentQuestion.answers.map(answer => ({
        ...answer,
        selected: false
      })))
    }
  }, [currentQuestion]);

  const handleOnSelectedAnswer = (idAnswer: string) => {
    setAnswersFormat((prev) => prev.map(answer => ({
      ...answer,
      selected: answer.id === idAnswer
    })));
  }

  const handleOnNextQuestion = async () => {
    const answerSelected = answersFormat.find(answer => answer.selected);
    if (answerSelected) {
      setAnswerSelected(currentQuestion.id, answerSelected?.id);
      await nextQuestion();
    }
  }

  const titleMemo = useMemo(
    () => currentQuestion?.text.split(':')?.[1]?.trim() || '',
    [currentQuestion.text]
  );

  const progressValue = useMemo(() => {
    const value = (pointer.actual + 1) * 100 / pointer.total;
    console.log({ value, actual: pointer.actual + 1, total: pointer.total });
    return value;
  }, [pointer]);

  return (
    <ProtectedLayout>
      <div className="min-w-min min-h-96 flex flex-col justify-around p-10">
        <div className="">
          <Progress value={progressValue} />
          <div className="flex flex-row justify-between p-4">
            <p>{1}</p>
            <p>{pointer.actual + 1}</p>
            <p>{pointer.total}</p>
          </div>
        </div>
        <div className="flex mx-auto max-v-7xl px-4 py-6 sm:px-6 lg:px-8 justify-center items-center flex-col">
          <h2 className="text-3x text-gray-500 pb-3">Pregunta: {pointer.actual + 1}</h2>
          <p className='text-3xl font-bold text-gray-900'>{titleMemo}</p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {
            answersFormat.map((answer, index) => (
              <button key={answer.id} onClick={() => handleOnSelectedAnswer(answer.id)}>
                <div className={`flex shadow min-w-5 p-4 border-1 rounded ${answer.selected ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'} transition-all`}>
                  <div className="font-semibold">{LETTERS[index]}:</div>
                  <div className="ml-1">{answer.text}</div>
                </div>
              </button>
            ))
          }
        </div>
      </div>
      <Button
        onClick={handleOnNextQuestion}
      >Siguiente pregunta</Button>
    </ProtectedLayout>
  );
};
