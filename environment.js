// exports.web3Provider_ws = process.env.WEB3_PROVIDER_WS ||  'ws://127.0.0.1:8545';
// exports.web3Provider_http = process.env.WEB3_PROVIDER_HTTP ||  'http://127.0.0.1:8545';

exports.owner = process.env.SURVIVOR_OWNER_ACCOUNT || '0xB263a9FcaCBFd0C6FAE4D924f2ceE4765ca0f093';
exports.privateKey = process.env.SURVIVOR_OWNER_KEY;

exports.contractAddress = process.env.SURVIVOR_CONTRACT_ADDRESS ||  '0x66341292964da8AEaf3C1F8cb71eeBa2CBb92970';

exports.web3Provider_ws = process.env.WEB3_PROVIDER_WS ||  'wss://ropsten.infura.io/ws';
exports.web3Provider_http = process.env.WEB3_PROVIDER_HTTP ||  'https://ropsten.infura.io/JCs6qYLCphYtcJVWWUpR';

exports.gasMultiplier =  process.env.GAS_MULTIPLIER || 2;

console.log(exports);
