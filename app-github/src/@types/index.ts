export interface APIUser{
  login: string;
  name: string;
  followers?: number;
  following?: number;
  public_repos: string;
  avatar_url: string;
  blog?: string;
  bio?: string;
  company?: string;
  email?: string;
  location: string;
}

export interface APIRepo{
  name: string;
  id?:number,
  owner: {
      login: string;
  };
  stargazers_count: number;
  forks: number;
  html_url: string;
  description?: string;
}

export interface APICommit {
  sha: string;
  node_id: string;
  commit:{
    author: {
      name: string,
      email: string,
      date: string
    }

    committer: {
      name: string,
      email: string,
      date: string
    }
    message: string
  }
  
}