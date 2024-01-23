import { type FC } from "react";
import styles from "./Footer.module.scss";
import { usePackingListContext } from "../context/PackingListContext";

const Footer: FC = function () {
  const { packingList } = usePackingListContext();

  const packed = packingList?.reduce(
    (packed, pl) => (pl.done === true ? (packed += 1) : packed),
    0
  );
  const packedPercentage = packed
    ? Math.floor((packed / packingList!.length) * 100)
    : 0;

  return (
    <footer className={styles.footer}>
      <div>
        🎒 You have {packingList?.length} items in your list and you already
        packed {packed} ({packedPercentage}%)
      </div>
    </footer>
  );
};

export default Footer;
