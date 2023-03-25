// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import {ERC2771Context} from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract GelatoGaslessWarriors is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Gelato Gasless Warriors", "GGW") {
        ERC2771Context(address(0xBf175FCC7086b4f9bd59d5EAE8eA67b8f940DE0d));
        warriors["avatar"] = "https://ipfs.io/ipfs/QmTDNYRLZWK42WZdfji5Z6x28rpwK38n94y7m5BhTNkC3P?filename=avatar.gif";
        warriors["bluesword"] = "https://ipfs.io/ipfs/QmVBXSzghXZvJHYDAEhycneJDnosDwCsmoS5x6QL323Y9C?filename=bluesword.gif";
        warriors["brutal"] = "https://ipfs.io/ipfs/QmQFqsBXxRxFsT5fjQVxjvPAH8PWe8cDQaEWDs96CAJVVL?filename=brutal.gif";
        warriors["greenlizard"] = "https://ipfs.io/ipfs/QmSJT8Ni7LgEU8dg3rFSzWZcSnVTfF46dX6BvuirNyewvM?filename=greenlizard.gif";
        warriors["heavybot"] = "https://ipfs.io/ipfs/QmWtWpBTRiVYNMGHH52RzHwTSWoFVRpho5wanbBpkCLHEp?filename=heavybot.gif";
        warriors["hecto"] = "https://ipfs.io/ipfs/QmWgkotHn6CiDkp8ebbLazTA9m5XaucisBX2SZ27tvbGTg?filename=hecto.gif";
        warriors["jumblo"] = "https://ipfs.io/ipfs/QmVoZ9AguLbfi4hYvoaNGwMoDHzPbx9gPUxfppe44B4vNS?filename=jumblo.gif";
        warriors["monkey"] = "https://ipfs.io/ipfs/QmWjaNh4kQ8wCqgujZEGvXVJgw5J6ruhYUFWSYZyx21byG?filename=monkey.gif";
        warriors["redflame"] = "https://ipfs.io/ipfs/QmRm1wafa7Rv5TfRZEThJBPsfQorGyoAR8wNXzxWTiBFU3?filename=redflame.gif";
    }

    mapping(string=>string) public warriors;
    function mint(string memory _warrior) public returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"image": "',
                            warriors[_warrior],
                        '"}'
                    )
                )
            )
        );
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        _setTokenURI(tokenId, finalTokenUri);
        return tokenId;
    }

    function burn(uint256 tokenId) public {
    require(_isApprovedOrOwner(msg.sender, tokenId), "caller is not owner nor approved");
    _burn(tokenId);
}

function getOwnedTokens(address _address) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_address);
    uint256[] memory result = new uint256[](tokenCount);
    uint256 index = 0;
    for (uint256 tokenId = 1; tokenId <= _tokenIds.current(); tokenId++) {
        if (ownerOf(tokenId) == _address) {
            result[index] = tokenId;
            index++;
        }
    }
    return result;
}
}
