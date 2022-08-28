import { GithubOutlined } from "@ant-design/icons";
import React from "react";
import styles from "../styles/input.module.css";

interface elementProps {
  nameUser: string;
  setNameUser: React.Dispatch<React.SetStateAction<string>>;
  onClosenUser: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

const Input = (props: elementProps) => {
  return (
    <form onSubmit={props.onClosenUser}>
      <h1 className={styles.title}>
        Sua plataforna de Pesquisa do GitHub <GithubOutlined />
      </h1>
      <div className={styles.containerForm}>
        <input
          className={styles.input}
          type="text"
          name="Login"
          id="Name"
          placeholder="Digite o usuario desejado"
          value={props.nameUser}
          onChange={(e) => props.setNameUser(e.target.value)}
        />
        <button className={styles.buttonSubmit} type="submit">
          Pesquisar
        </button>
      </div>
    </form>
  );
};

export { Input };
