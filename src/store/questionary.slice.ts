import { create } from "zustand";
import {
  GetAnswersResponse,
  GetQuestionResponse,
  QuestionSlice,
  QuestionState,
  UnorderedQuestions
} from "../interfaces/questionary";
import { HTTP } from "../Http/AxiosInstance.ts";

const initialStateQuestion: QuestionState = {
  length: 0,
  current: {
    id: '',
    answers: [],
    text: '',
    totalAnswers: 0
  },
  items: [],
  pointer: {
    actual: 0,
    next: 0,
    previous: 0,
    total: 0,
    order: []
  },
};

export const useQuestionaryStore = create<QuestionSlice>((set, get) => {
  return {
    ...initialStateQuestion,
    getQuestions: async (subjectId) => {
      const response = await HTTP.GET<GetQuestionResponse>(`/api/questions/${subjectId}`, {});
      const randomQuestions: UnorderedQuestions[] = [...response.data.questions]
        .map((question) => ({id: question.id, answered: false}))
        .sort(() => Math.random() - 0.5)
      set({
        items: response.data.questions,
        length: response.data.totalQuestions,
        pointer: {
          actual: 0,
          next: 1,
          previous: 0,
          total: randomQuestions.length,
          order: randomQuestions
        }
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
        current: {
          ...get().current,
          answers: response.data.answers,
          totalAnswers: response.data.totalAnswers,
        },
        items: addAnswersToQuestions,
      })
    },
    initQuestionary: async (subjectId: string) => {
      await get().getQuestions(subjectId);
      const pointer = get().pointer;
      const items = get().items;
      if (pointer.order.length > 0) {
        const firstQuestion = pointer.order[0];
        const currentQuestion = items.find(question => question.id === firstQuestion.id);
        if (currentQuestion) {
          get().setCurrentQuestion(currentQuestion.id);
          const next = pointer.total === pointer.actual ? pointer.actual : pointer.next + 1;
          const previous = pointer.actual === 0 ? 0 : pointer.actual - 1;
          set({
            pointer: {
              ...pointer,
              next,
              previous,
            }
          });
          await get().getAnswers();
          return currentQuestion.id;
        }
      }
    },
    nextQuestion: async () => {
      const pointer = get().pointer;
      const nextQuestion = get().pointer.order[pointer.next];
      get().setCurrentQuestion(nextQuestion.id);
      await get().getAnswers();
      const next = pointer.total === pointer.actual ? pointer.actual : pointer.next + 1;
      const previous = pointer.actual === 0 ? 0 : pointer.actual - 1;
      set({
        pointer: {
          ...pointer,
          next,
          actual: pointer.actual + 1,
          previous,
        }
      })
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
