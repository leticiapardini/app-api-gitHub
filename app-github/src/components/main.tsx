import React, { useEffect, useState } from "react";
import { edpointApi } from "../integrations/apiGitHub";
import { APIUser } from "../@types";
import styles from "./main.module.css";

const Main = () => {
  const [returnApi, setReturnApi] = useState<APIUser>();

  useEffect(() => {
    const data = edpointApi
      .get("/leticiapardini")
      .then((data) => {
        setReturnApi(data.data);
      })
      .catch((erro) => {
        console.log(erro, "erro");
      });
  }, []);
  console.log(returnApi);
  return (
    <div>
      {returnApi ? (
        <div key={returnApi.login} className={styles.containerMain}>
          <img className={styles.photo} src={returnApi.avatar_url} />
          <div className={styles.description}>{returnApi.bio}</div>
          <div className={styles.followers}> Seguidores: {returnApi.followers}</div>
          <div className={styles.followers}> Nº Repositórios: {returnApi.public_repos}</div>
        </div>
      ) : (
        "sem resultados"
      )}
    </div>
  );
};
export { Main };
