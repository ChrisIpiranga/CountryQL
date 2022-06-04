import "./css/App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GetCountries from "./Components/GetCountries";
import { ToastContainer } from "react-toastify";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function App() {
  return (
    <div className="container">
      <ToastContainer autoClose={1500} theme="dark" position="top-center" />
      <ApolloProvider client={client}>
        <GetCountries />
      </ApolloProvider>
    </div>
  );
}

export default App;
