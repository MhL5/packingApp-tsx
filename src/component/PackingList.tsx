import { useState, type FC } from "react";

import styles from "./PackingList.module.scss";
import Item from "./Item";

import { usePackingListContext } from "../context/PackingListContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PackingList: FC = function () {
  const [selectValue, setSelectValue] = useState("InputOrder");
  const { packingList, setPackingList } = usePackingListContext();
  const [,setPackingListLocalStorage] = useLocalStorage({ key: "packingList" });

  let sortedItems;
  if (selectValue === "InputOrder") sortedItems = packingList;
  if (selectValue === "packedStatus") {
    sortedItems = packingList
      ?.slice()
      .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));
  }
  if (selectValue === "description") {
    sortedItems = packingList
      ?.slice()
      .sort((a, b) => a.content.localeCompare(b.content));
  }

  function handleClear() {
    setPackingList([]);
    setPackingListLocalStorage([]);
  }

  return (
    <main className={styles.main}>
      <ul className={styles.items}>
        {sortedItems &&
          sortedItems.map((item) => <Item key={item.id} {...item} />)}
      </ul>

      <div className={styles.btnContainer}>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="InputOrder">Sort by input order</option>
          <option value="packedStatus">Sort by Packed Status</option>
          <option value="description">Sort by Packed Description</option>
        </select>
        <button onClick={handleClear}>Clear</button>
      </div>
    </main>
  );
};

export default PackingList;
