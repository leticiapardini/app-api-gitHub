import React from "react";

interface elementProps {
  nameUser: string
  setNameUser: React.Dispatch<React.SetStateAction<string>>
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  onClosenUser: (event: React.ChangeEvent<HTMLFormElement>) => void
}

const Input = (props: elementProps) => {

  return (
    <form onSubmit={props.onClosenUser}>
      <input type="text" name="Login" id="Name" 
      placeholder="Digite o usuario desejado" 
      value={props.nameUser}
      onChange={(e) => props.setNameUser(e.target.value)}/>
      <button type="submit">Pesquisar</button>
    </form>
  )
};

export { Input }