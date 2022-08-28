import React, { useEffect, useState } from "react";
import { endpointApi } from "../integrations/apiGitHub";
import { Link, useNavigate } from "react-router-dom";
import { APICommit } from "../@types";
import { Card, Empty } from "antd";
import { collect } from "collect.js";
import { GithubOutlined } from "@ant-design/icons";
import styles from "../styles/commit.module.css";

const Commit = () => {
  const userLocalStorage = localStorage.getItem("user");
  const commitLocalStorage = localStorage.getItem("repo");
  const [commitPerformed, setCommitPerformed] = useState<APICommit[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const data = endpointApi
      .get(`/repos/${userLocalStorage}/${commitLocalStorage}/commits`)
      .then((data) => {
        setCommitPerformed(data.data);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, []);

  const colection = collect(commitPerformed);
  const result = colection.take(10);
  return (
    <>
      <button
        className={styles.buttonReturn}
        onClick={() => {
          navigate("/");
          localStorage.removeItem("user");
          localStorage.removeItem("repo");
        }}
      >
        Página Inicial
      </button>
      {commitPerformed
        ? result.map((element) => {
            return (
              <Card
                className={styles.Card}
                title={"Commits do Repositório escolhido"}
                key={element.sha}
              >
                <p> Autor: {element.commit.author.name}</p>
                <p> Email: {element.commit.author.email}</p>
                <p> Data: {element.commit.author.date}</p>
                <p> Mensagem: {element.commit.message}</p>
              </Card>
            );
          })
        : (<Empty description="Esse repósitório não possui commits" />)}
    </>
  );
};

export { Commit };
