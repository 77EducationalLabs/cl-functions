const ethers = await import('npm:ethers@6.10.0');

const RPC_URL = 'https://ethereum.publicnode.com';

class FunctionsJsonRpcProvider extends ethers.JsonRpcProvider {
  constructor(url) {
    super(url);
    this.url = url;
  }

  async _send(payload) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  }
}

const provider = new FunctionsJsonRpcProvider(RPC_URL);

if (!args || args.length === 0) {
  throw new Error("Wallet address is required as the first argument.");
}

const walletAddress = args[0];

if (!ethers.isAddress(walletAddress)) {
  throw new Error("Invalid Ethereum address.");
}

const balance = await provider.getBalance(walletAddress);

return Functions.encodeInt256(balance);
