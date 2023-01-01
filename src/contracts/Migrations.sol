// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22<0.9.0;


contract Migrations{
    address public owner = msg.sender;
    uint public last_completed_migrations;

    modifier restricted(){
        require(msg.sender==owner,
        "This function is restricted to owner only"
        );
        _;
    }

    function setCompleted(uint completed) public restricted{
        last_completed_migrations = completed;
    }
}