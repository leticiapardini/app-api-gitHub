import React, { useEffect } from "react";
import { endpointApi } from "../integrations/apiGitHub";
import { useNavigate } from "react-router-dom";

const Commit = () => {

  const userLocalStorage = localStorage.getItem("user");
  const commitLocalStorage = localStorage.getItem("repo");

  const navigate = useNavigate()
  useEffect(() => {
    const data = endpointApi
      .get(`/repos/${userLocalStorage}/${commitLocalStorage}/commits`)
      .then((data) => {
        console.log(data.data);
      })
      .catch((erro) => {
        console.error(erro, "erro");
      });
  }, []);

  console.log(userLocalStorage, 'user')
  console.log(commitLocalStorage, 'commit')

  return(
    <>
    <button onClick={() => {
      navigate('/')
      localStorage.removeItem('user')
      localStorage.removeItem('repo')
    }}>voltar</button>
    <div>ola</div>
    </>
  )
}

export { Commit }