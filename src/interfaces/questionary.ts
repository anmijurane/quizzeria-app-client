
export interface Question {
  id: string;
  text: string;
}

export interface Answer {
  id: string;
  selected: boolean;
  text: string
}

export interface Answers {
  answers: Answer[];
  totalAnswers: number;
}

export type QuestionWithAnswer = Question & Partial<Answers>

export interface QuestionState {
  current: QuestionWithAnswer | object;
  items: QuestionWithAnswer[];
  length: number
}

export interface QuestionActions {
  getAnswers: (questionId: string) => Promise<void>;
  getQuestions: (subjectId: string) => Promise<void>;
  setAnswerSelected: (questionId: string, answerId: string) => void;
  setCurrentQuestion: (questionId: string) => void;
}

export type QuestionSlice = QuestionState & QuestionActions;

export interface GetQuestionResponse {
  questions: Question[];
  totalQuestions: number;
}

export type GetAnswersResponse = Answers
