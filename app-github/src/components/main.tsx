import React, { useEffect, useState } from "react";
import { endpointApi } from "../integrations/apiGitHub";
import { APIRepo, APIUser } from "../@types";
import styles from "../styles/main.module.css";
import { Link } from "react-router-dom";
import { Empty } from 'antd';


const Main = () => {
  const [returnApi, setReturnApi] = useState<APIUser>();
  const [returnApiRepos, setReturnApiRepos] = useState<APIRepo[]>([]);

  useEffect(() => {
    const data = endpointApi
      .get("/leticiapardini")
      .then((data) => {
        setReturnApi(data.data);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, []);

  useEffect(() => {
    const data = endpointApi
      .get("/leticiapardini/repos")
      .then((data) => {
        setReturnApiRepos(data.data);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, []);

  return (
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
            <span className={styles.titleRepo}>Repositórios Publicos</span>
            {returnApiRepos
              ? returnApiRepos.map((repo) => (
                  <div className={styles.repo} key={repo.html_url}>
                    <Link className={styles.repo} to="">{repo.name}</Link>
                  </div>
                ))
              : 
                (<Empty
                description='Usuário não tem repositórios publicos'/>)
            }
          </div>
        
        </>
      ) : (
        <Empty
        description="Não encontramos esse usuário"/>
      )}
    </div>
  );
};
export { Main };
