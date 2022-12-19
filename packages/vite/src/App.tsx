import React from "react";

const App = () => {
  async function showTeste() {
    return await window.electronContext.getUsers();
  }

  React.useEffect(() => {
    (async () => {
      const user = await showTeste();
      console.log(user);
    })();
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
};

export default App;
