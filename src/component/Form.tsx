import { type FC, type FormEvent, useState } from "react";

import styles from "./Form.module.scss";

import { usePackingListContext } from "../context/PackingListContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Form: FC = function () {
  const [inputText, setInputText] = useState("");
  const [select, setSelect] = useState(1);
  const { packingList, setPackingList } = usePackingListContext();
  const [, setPackingListLocalStorage] = useLocalStorage({
    key: "packingList",
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const newPl = {
      content: inputText,
      done: false,
      id: Math.random(),
      quantity: select,
    };

    // update state
    setPackingList((pl) => [...pl, newPl]);
    // update localStorage
    setPackingListLocalStorage(packingList);
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <p>What do you need for your trip?🙄</p>

      <select value={select} onChange={(e) => setSelect(+e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => (
          <option key={`${index + 1}`} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Items..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
};

export default Form;
