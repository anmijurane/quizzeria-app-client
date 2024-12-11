import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { HomePage, Questionary, AnswerQuestionary } from "../pages";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomePage,
    errorElement: "Handle Error",
  },
  {
    path: '/questionary/:id',
    Component: Questionary,
    errorElement: "Handle Error",
  },
  {
    path: '/question/:id',
    Component: AnswerQuestionary,
    errorElement: "Handle Error",
  }
];

export const browserRouter = createBrowserRouter(routes);
