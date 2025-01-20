import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { HomePage, Questionary, AnswerQuestionary } from "../pages";
import { AuthLayout } from "@src/layouts/Auth";
import { Register } from "@src/pages/Register";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomePage,
    errorElement: "Handle Error",
  },
  {
    path: '/quiz',
    children: [
      {
        path: ':quiz_id',
        Component: Questionary
      },
      {
        path: ':quiz_id/question/:question_id',
        Component: AnswerQuestionary,
      }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: 'Auth Handle Error',
    children: [
      {
        path: 'register',
        element: <Register />,
      }
    ]
  },
  {
    path: '*',
    Component: () => <h1>Not found</h1>,
  }
];

export const browserRouter = createBrowserRouter(routes);
