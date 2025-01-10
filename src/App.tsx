import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./route";

import './css/App.css';
import './i18n.config';

function App() {

  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App
