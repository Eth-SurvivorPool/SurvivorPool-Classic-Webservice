
// exports.owner = process.env.SURVIVOR_OWNER_ACCOUNT || '0xce0A39b0d4A3b3c7D3AD6190E6C855D823B14609';
// exports.contractAddress = process.env.SURVIVOR_CONTRACT_ADDRESS ||  '0x55cc926f1a4724941e8ae7bc38710529ac413dc5';
// exports.web3Provider_ws = process.env.WEB3_PROVIDER_WS ||  'ws://127.0.0.1:8545';
// exports.web3Provider_http = process.env.WEB3_PROVIDER_HTTP ||  ' 'http://127.0.0.1:8545';


exports.owner = process.env.SURVIVOR_OWNER_ACCOUNT || '0x0092c05d70b07A3d110255890Bdb52AE3B7104A1';
exports.contractAddress = process.env.SURVIVOR_CONTRACT_ADDRESS ||  '0xEf5a1D25FB91a0490a5740de35b71e90fbB52822';

exports.web3Provider_ws = process.env.WEB3_PROVIDER_WS ||  'wss://ropsten.infura.io/_ws';
exports.web3Provider_http = process.env.WEB3_PROVIDER_HTTP ||  'https://ropsten.infura.io/JCs6qYLCphYtcJVWWUpR';

console.log(exports);
