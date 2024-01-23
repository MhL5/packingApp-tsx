import { FC } from "react";
import Header from "./component/Header";
import styles from "./App.module.scss";
import Form from "./component/Form";
import PackingList from "./component/PackingList";
import Footer from "./component/Footer";
import { PackingListProvider } from "./context/PackingListContext";

const App: FC = function () {
  return (
    <PackingListProvider>
      <div className={styles.app}>
        <Header as="h1">😉 Far Away</Header>
        <Form />
        <PackingList />
        <Footer />
      </div>
    </PackingListProvider>
  );
};

export default App;
