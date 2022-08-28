import React, { useEffect, useState } from "react";
import { endpointApi } from "../integrations/apiGitHub";
import { APIRepo, APIUser } from "../@types";
import styles from "../styles/main.module.css";
import { Empty } from "antd";
import { Input } from "./input";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [nameUser, setNameUser] = useState<string>("");
  const [user, setUser] = useState<string>("leticiapardini");
  const [returnApi, setReturnApi] = useState<APIUser>();
  const [returnApiRepos, setReturnApiRepos] = useState<APIRepo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = endpointApi
      .get(`/users/${user}/repos`)
      .then((data) => {
        setReturnApiRepos(data.data);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, [user]);

  useEffect(() => {
    const data = endpointApi
      .get(`/users/${user}`)
      .then((data) => {
        setReturnApi(data.data);
        localStorage.setItem("user", user);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, [user]);

  const onClosenUser = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser(nameUser);
    setNameUser("");
  };
  return (
    <>
      <Input
        nameUser={nameUser}
        setNameUser={setNameUser}
        onClosenUser={onClosenUser}
      />
      <div className={styles.containerMain}>
        {returnApi ? (
          <>
            <div key={returnApi.login} className={styles.containerGridOne}>
              <img className={styles.photo} src={returnApi.avatar_url} />
              <div className={styles.description}>{returnApi.bio}</div>
              <div className={styles.followers}>
                {" "}
                Seguidores: {returnApi.followers}
              </div>
              <div className={styles.followers}>
                {" "}
                Nº Repositórios: {returnApi.public_repos}
              </div>
            </div>
            <div className={styles.containerGridTwo}>
              <span className={styles.titleRepo}>
                {" "}
                Repositórios Publicos, clique e saiba mais informações
              </span>
              {returnApiRepos ? (
                returnApiRepos.map((repo) => (
                  <div className={styles.repo} key={repo.html_url}>
                    <button
                      className={styles.repo}
                      onClick={(event) => {
                        navigate("/commits");
                        localStorage.setItem(
                          "repo",
                          event.currentTarget.innerHTML
                        );
                      }}
                    >
                      {repo.name}
                    </button>
                  </div>
                ))
              ) : (
                <Empty description="Usuário não tem repositórios publicos" />
              )}
            </div>
          </>
        ) : (
          <Empty description="Não encontramos esse usuário" />
        )}
      </div>
    </>
  );
};
export { Main };
