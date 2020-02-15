let address = "0xf0E0E842Efb2cC5B196461927Ef25471f03D2511";
let abi = [{
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "donator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "UpdateHash",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "_hash",
            "type": "string"
        }],
        "name": "updateHash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getHash",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];