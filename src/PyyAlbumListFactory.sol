// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {PyyAlbumList} from "./PyyAlbumList.sol";

contract PyyAlbumListFactory {
    address public owner;

    struct AlbumList {
        address albumListAddress;
        address owner;
        string name;
        string description;
        uint256 createAt;
    }

    AlbumList[] public albumLists;
    mapping(address => AlbumList[]) public userAlbumLists;

    constructor() {
        owner = msg.sender;
    }

    function createAlbumList(
        string memory _name,
        string memory _description,
        uint256 _durationDays
    ) external {
        PyyAlbumList newAlbumList = new PyyAlbumList(
            msg.sender,
            _name,
            _description,
            _durationDays
        );
        address albumListAddress = address(newAlbumList);

        AlbumList memory albumList = AlbumList({
            albumListAddress: albumListAddress,
            owner: msg.sender,
            name: _name,
            description: _description, 
            createAt: block.timestamp
        });

        albumLists.push(albumList);
        userAlbumLists[msg.sender].push(albumList);
    }

    function getAlbumListsByUser(address _userAddress) external view returns (AlbumList[] memory) {
        return userAlbumLists[_userAddress];
    }

    function getAllAlbumLists() external view returns (AlbumList[] memory) {
        return albumLists;
    }
}