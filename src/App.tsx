import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./route";

import './css/App.css'

function App() {

  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App
