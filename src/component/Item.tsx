import { type FC } from "react";

import styles from "./Item.module.scss";

import { usePackingListContext } from "../context/PackingListContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Item: FC<{
  content: string;
  id: number;
  done: boolean;
  quantity: number;
}> = function ({ content, id, done, quantity }) {
  const { packingList, setPackingList } = usePackingListContext();
  const [, setPackingListLocalStorage] = useLocalStorage({
    key: "packingList",
  });

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setPackingList((pl) => pl!.filter((item) => item.id !== id));
  }

  function handleDone() {
    setPackingList((pls) =>
      pls.map((pl) => {
        if (pl.id === id) {
          const updatedPl = {
            content: pl.content,
            done: !pl.done,
            id: pl.id,
            quantity: pl.quantity,
          };

          return updatedPl;
        }

        return pl;
      })
    );
    setPackingListLocalStorage(packingList);
  }

  return (
    <div className={`${styles.item} ${id}`}>
      <input type="checkbox" checked={done} onChange={handleDone} />
      <p style={{ textDecoration: `${done ? `line-through` : "none"}` }}>
        {`${quantity > 0 ? quantity : ""} ${content}`}
      </p>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
};

export default Item;
