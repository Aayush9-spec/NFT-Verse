pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/Console.sol";
import {GameGateway} from "../src/GameAppGateway.sol";
import {GameDeployer} from "../src/GameDeployer.sol";
import {FeesData} from "lib/socket-protocol/contracts/common/Structs.sol";
import {ETH_ADDRESS} from "lib/socket-protocol/contracts/common/Constants.sol";

contract SetupMyToken is Script {
    function run() public {
        address addressResolver = vm.envAddress("ADDRESS_RESOLVER");

        string memory rpc = vm.envString("SOCKET_RPC");
        vm.createSelectFork(rpc);

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Setting fee payment on Ethereum Sepolia
        FeesData memory feesData = FeesData({
            feePoolChain: 11155111,
            feePoolToken: ETH_ADDRESS,
            maxFees: 5 ether
        });

        GameDeployer gameDeployer = new GameDeployer(
            addressResolver,
            feesData
        );

        GameGateway gameGateway = new GameGateway(
            addressResolver,
            address(gameDeployer),
            feesData
        );

        console.log("MyTokenDeployer: ", address(gameDeployer));
        console.log("MyTokenAppGateway: ", address(gameGateway));
    }
}