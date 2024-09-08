// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract PyyAlbumList {
    string public name;
    string public description;
    uint256 public deadline;
    address public owner;

    struct Album {
        string name;
        string annotations;
        uint256 review;
        string frontImage;
        string backImage;
        string albumUrl;
    }

    constructor() {

    }
}
