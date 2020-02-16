//jshint esversion:6
window.addEventListener('load', async () => {
    //address and abi already loaded

    const initContract = async () => {
        contract = new web3.eth.Contract(abi, address);
        window.methods = contract.methods;
        window.contract = contract;
        window.sender = web3.eth.currentProvider.selectedAddress;
    };

    const sendEther = async (receiver, amount) => {
        let receipt = await web3.eth.sendTransaction({
            from: sender,
            to: receiver,
            gasPrice: "120000000000",
            value: web3.utils.toWei(amount, 'ether')
        }).on('receipt', r => {
            console.log(r);
        }).on('error', console.error);
        let url = "https://ropsten.etherscan.io/tx/" + receipt.transactionHash;
        return Promise.resolve(url);
    };

    const updateHash = async (hash) => {
        let receipt = await methods.updateHash(hash).send({
            from: sender,
            gasPrice: "120000000000",
            value: 0
        }).on('receipt', r => {
            console.log(r);
        }).on('error', console.error);
        console.log("recipt!!", receipt.transactionHash);
        let url = "https://ropsten.etherscan.io/tx/" + receipt.transactionHash;
        return Promise.resolve(url);
    };

    const getHash = async () => {
        let hash = await methods.getHash().call({
            from: sender
        });
        return Promise.resolve(hash);
    };

    //modern dapp browser
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        await ethereum.enable();
    } else {
        // Non-dapp browsers…
        console.log("Ethereum browser not detected.You should consider trying MetaMask!");
    }

    try {
        await initContract();
        // let url1 = await sendEther("0xEB8a5755f2A9BCBe686B3d841405221EF21db855", "0.05");
        // console.log("SENT", url1);
        let url2 = await updateHash("HHHHH");
        console.log("URL2", url2);
        let hash = await getHash();
        console.log("HASH", hash);

    } catch (err) {
        console.log(err);
    }
});