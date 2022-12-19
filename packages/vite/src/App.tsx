import React from "react";

const App = () => {
  async function showUser() {
    return await window.electronContext.getUsers();
  }

  async function testeModule() {
    return await window.electronContext.testeModule();
  }

  React.useEffect(() => {
    (async () => {
      const user = await showUser();
      console.log(user);
    })();
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={testeModule}>Mudar titulo</button>
    </div>
  );
};

export default App;
