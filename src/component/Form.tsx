import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { usePackingListContext } from "../context/PackingListContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Form: FC = function () {
  const [inputText, setInputText] = useState("");
  const [select, setSelect] = useState(1);
  const { packingList, setPackingList } = usePackingListContext();
  const { updateValue } = useLocalStorage({ key: "packingList" });

  useEffect(() => {
    updateValue(packingList);
  }, [packingList, updateValue]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    setPackingList((pl) => {
      let result;
      if (pl === null || pl.length === 0)
        result = [
          {
            content: inputText,
            done: false,
            id: Math.random(),
            quantity: select,
          },
        ];

      if (pl?.length)
        result = [
          ...pl,
          {
            content: inputText,
            done: false,
            id: Math.random(),
            quantity: select,
          },
        ];

      return result || null;
    });
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