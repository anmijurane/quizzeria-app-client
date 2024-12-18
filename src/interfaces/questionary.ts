
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

export interface Pointer {
  actual: number;
  next: number;
  previous: number;
  total: number;
  order: UnorderedQuestions[];
}

export interface UnorderedQuestions {
  id: string;
  answered: boolean;
}

export type QuestionWithAnswer = Question & Partial<Answers>

export interface QuestionState {
  current: QuestionWithAnswer;
  items: QuestionWithAnswer[];
  length: number;
  pointer: Pointer;
}

export interface QuestionActions {
  getAnswers: () => Promise<void>;
  getQuestions: (subjectId: string) => Promise<void>;
  initQuestionary: (questionId: string) => Promise<string | undefined>;
  nextQuestion: () => Promise<void>;
  setAnswerSelected: (questionId: string, answerId: string) => void;
  setCurrentQuestion: (questionId: string) => void;
}

export type QuestionSlice = QuestionState & QuestionActions;

export interface GetQuestionResponse {
  questions: Question[];
  totalQuestions: number;
}

export type GetAnswersResponse = Answers
