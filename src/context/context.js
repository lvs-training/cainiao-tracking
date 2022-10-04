import React, { useState, useEffect } from "react";
import axios from "axios";

const rootUrl = "https://global.cainiao.com/global/detail.json";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    const response = await axios(`${rootUrl}?mailNos=${user}&lang=en-US`).catch(
      (err) => console.log(err)
    );
    console.log(response);
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, "there is no user with that name");
    }
    setIsLoading(false);
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  //error
  return (
    <GithubContext.Provider value={{ error, searchGithubUser, isLoading }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
