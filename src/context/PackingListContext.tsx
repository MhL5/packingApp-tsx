import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type PackingListState =
  | {
      content: string;
      done: boolean;
      id: number;
      quantity: number;
    }[]
  | [];

type PackingListContextType = {
  packingList: PackingListState;
  setPackingList: React.Dispatch<React.SetStateAction<PackingListState>>;
};

const PackingListContext = createContext<PackingListContextType | null>(null);

function PackingListProvider({ children }: { children: ReactNode }) {
  const [packingListLocalStorage] = useLocalStorage({
    key: "packingList",
  });

  const [packingList, setPackingList] = useState<PackingListState>(() => {
    if (packingListLocalStorage)
      return packingListLocalStorage as PackingListState;
    else return [];
  });

  const ctx = {
    packingList,
    setPackingList,
  };

  return (
    <PackingListContext.Provider value={ctx}>
      {children}
    </PackingListContext.Provider>
  );
}

function usePackingListContext() {
  const context = useContext(PackingListContext);
  if (context === null)
    throw new Error("Context was called outside of it's provider! 🙄");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { PackingListProvider, usePackingListContext };
