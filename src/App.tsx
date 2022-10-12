import Pages from "./pages";
import WalletProvider from "./wallet";

function App() {
  return (
    <WalletProvider>
      <Pages />
    </WalletProvider>
  );
}

export default App;
