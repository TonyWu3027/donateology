pragma solidity ^0.5.3;
contract Donation {
    mapping(address => string) donatorHash;
    mapping(address => Item) donator;

    struct Item {
        string itemType;
        uint256 amount;
    }

    event UpdateHash(address indexed donator, string indexed hash);

    function updateHash(string memory _hash) public {
        donatorHash[msg.sender] = _hash;
        emit UpdateHash(msg.sender, _hash);
    }

    function getHash() public view returns (string memory) {
        return donatorHash[msg.sender];
    }

}
