import { useEffect, type FC } from "react";
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
  const { updateValue } = useLocalStorage({ key: "packingList" });

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setPackingList((pl) => {
      const res = pl!.filter((item) => item.id !== id);
      return res;
    });
  }

  function handleDone() {
    setPackingList((pls) => {
      if (pls !== undefined) {
        return pls!.map((pl) => {
          if (pl.id === id)
            return {
              content: pl.content,
              done: !pl.done,
              id: pl.id,
              quantity: pl.quantity,
            };
          else return pl;
        });
      }

      return null;
    });
  }

  useEffect(() => {
    updateValue(packingList);
  }, [packingList, updateValue]);

  return (
    <div className={`${styles.item} ${id}`}>
      <input type="checkbox" checked={done} onChange={handleDone} />
      <p style={{ textDecoration: `${done ? `line-through` : "none"}` }}>
        {`${quantity} ${content}`}
      </p>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
};

export default Item;
