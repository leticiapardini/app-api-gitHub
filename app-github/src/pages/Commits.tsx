import React, { useEffect, useState } from "react";
import { endpointApi } from "../integrations/apiGitHub";
import { useNavigate } from "react-router-dom";
import { APICommit } from "../@types";
import { Card, Col, Empty, Row } from "antd";
import { collect } from "collect.js";
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
      <p className={styles.titleCommit}> Commits do Repositório escolhido</p>
      {commitPerformed ? (
        result.map((element) => {
          return (
      
          <Col className={styles.col} span={12}>
            <Card
              className={styles.Card}
              key={element.sha}
            >
              <p className={styles.author}> Autor: {element.commit.author.name}</p>
              <p> E-mail: {element.commit.author.email}</p>
              <p> Data: {element.commit.author.date}</p>
              <p> Mensagem: {element.commit.message}</p>
            </Card>
            </Col>
           
          );
        })
      ) : (
        <Empty description="Esse repósitório não possui commits" />
      )}
    </>
  );
};

export { Commit };
