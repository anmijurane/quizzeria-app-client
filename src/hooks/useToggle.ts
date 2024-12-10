import { useState } from "react"

export const useToggle = (initialValue = false): [boolean, () => void] => {

  const [stateValue, setStateValue] = useState(initialValue)

  const toggleFunc = () => {
    setStateValue(!stateValue);
  }

  return [stateValue, toggleFunc]

}

export const useToggleWithValue = <T, S>(firstValue: T, secondValue: T):[T, React.MouseEventHandler<HTMLButtonElement> | S] => {
  const [stateValue, setStateValue] = useState(true);

  const handleToggle = () => {
    setStateValue(!stateValue);
  }

  return [stateValue ? firstValue : secondValue, handleToggle]
}
