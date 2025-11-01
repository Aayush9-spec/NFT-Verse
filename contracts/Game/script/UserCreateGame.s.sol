pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GameGateway} from "../src/GameAppGateway.sol";

contract UserCreateGame is Script {
    function run() public {
        string memory rpc = vm.envString("SOCKET_RPC");
        vm.createSelectFork(rpc);

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        GameGateway gameGateway = GameGateway(0x0CDD7e74C2817f24e437c53b6f4d8A9596ca96F0);
        gameGateway.createGame(0x8bc5F8D38d12b59e0575C63BC31B401c1c4d7B11 , 0);
    }
}