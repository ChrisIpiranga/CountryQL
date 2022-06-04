import "./css/App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GetCountries from "./Components/GetCountries";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function App() {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        <GetCountries />
      </ApolloProvider>
    </div>
  );
}

export default App;
