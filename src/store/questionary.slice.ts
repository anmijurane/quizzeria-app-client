import { create } from "zustand";
import {GetAnswersResponse, GetQuestionResponse, QuestionSlice, QuestionState} from "../interfaces/questionary";
import {HTTP} from "../Http/AxiosInstance.ts";

const initialStateQuestion: QuestionState = {
  length: 0,
  current: {
    id: '',
    answers: [],
    text: '',
    totalAnswers: 0
  },
  items: [],
};

export const useQuestionaryStore = create<QuestionSlice>((set, get) => {
  return {
    ...initialStateQuestion,
    getQuestions: async (subjectId) => {
      const response = await HTTP.GET<GetQuestionResponse>(`/api/questions/${subjectId}`, {})
      set({
        items: response.data.questions,
        length: response.data.totalQuestions,
      })
    },
    getAnswers: async () => {
      const questionId: string = get().current?.id;
      if (!questionId) {
        throw new Error('No question id found.');
      }
      const response = await HTTP.GET<GetAnswersResponse>(`/api/questions/getAnswers/${questionId}`, {})
      const state = get();
      const addAnswersToQuestions = state.items.map((item) =>
        item.id === questionId
          ? {...item, answers: response.data.answers, totalAnswers: response.data.totalAnswers}
          : item
      );
      set({
        items: addAnswersToQuestions,
      })
    },
    initQuestionary: async (subjectId: string) => {
      await get().getQuestions(subjectId);
      const items = get().items;
      if (items.length > 0) {
        const currentQuestion = items[0].id;
        get().setCurrentQuestion(currentQuestion);
        return currentQuestion;
      }
    },
    setCurrentQuestion: (questionId: string) => {
      const current = get().items.find((q) => q.id === questionId)
      set({current});
    },
    setAnswerSelected: (questionId, answerId) => {
      const questionsItems = get().items.map((question) => {
        if (question.id === questionId) {
          if (question?.answers && question.answers.length > 0) {
            const answerResolved = question.answers.map(answer => {
              return answer.id === answerId ? {...answer, selected: true} : answer;
            })
            return {
              ...question,
              answers: answerResolved,
            }
          }
          return question;
        }
        return question;
      })
      set({items: questionsItems});
    },
  }
});
