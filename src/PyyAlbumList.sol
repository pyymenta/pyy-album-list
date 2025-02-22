// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract PyyAlbumList {
    string public name;
    string public description;
    uint256 public deadline;
    address public owner;

    struct Album {
        string name;
        string artist;
        string annotations;
        uint256 review;
        string frontImage;
        string backImage;
        string albumUrl;
    }

    Album[] public albuns;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        uint256 _durationDays
    ) {
        owner = _owner;
        name = _name;
        description = _description;
        deadline = block.timestamp + (_durationDays * 1 days);
    }

    function addAlbum(
        string memory _name,
        string memory _artist,
        string memory _annotations,
        uint256 _review,
        string memory _frontImage,
        string memory _backImage,
        string memory _albumUrl
    ) public onlyOwner {
        require(_review >= 0 && _review <= 10, "Review value should be more or equal than 0 and less or equal than 10");

        albuns.push(Album(_name, _artist, _annotations, _review, _frontImage, _backImage, _albumUrl));
    }

    function removeAlbum(uint256 _index) public onlyOwner {
        require(_index < albuns.length, "Album does not exist.");

        albuns[_index] = albuns[albuns.length -1];
        albuns.pop();
    }

    function getAlbums() public view returns (Album[] memory) {
        return albuns;
    }

    function extendDeadline(uint256 _daysToAdd) public onlyOwner {
        deadline += _daysToAdd * 1 days;
    }
}
