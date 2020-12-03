const { SELLER_ADDR } = require("../src/js/constants");
var Purchase = artifacts.require("./Purchase.sol");

// Initialize contract with 2 ethereum
module.exports = function (deployer) {
  deployer.deploy(Purchase, { from: SELLER_ADDR, value: "2000000000000000000" });
};
