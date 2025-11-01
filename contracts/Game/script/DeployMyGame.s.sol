pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {GameDeployer} from "../src/GameDeployer.sol";

contract DeployMyToken is Script {
    function run() public {
        string memory rpc = vm.envString("SOCKET_RPC");
        vm.createSelectFork(rpc);

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        GameDeployer gameDeployer = GameDeployer(0xCbF7641eb08dd82855b4c320ca2d58aA3577D0eA);
        gameDeployer.deployContracts(11155111);
        gameDeployer.deployContracts(421614);
        gameDeployer.deployContracts(84532);
    }
}