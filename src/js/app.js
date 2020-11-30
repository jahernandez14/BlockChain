var transactionInstance;
var contract;

App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Purchase.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var PurchaseArtifact = data;

      App.contracts.Purchase = TruffleContract(PurchaseArtifact);
      App.contracts.Purchase.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".seller", App.sellerEvent);
    $(document).on("click", ".buyer", App.buyerEvent);
    $(document).on("click", ".cancel", App.cancelEvent);
    $(document).on("click", ".complete", App.completeEvent);
    $(document).on("click", ".confirm", App.confirmEvent);
    $(document).on("click", ".received", App.receivedEvent);
  },

  sellerEvent: function (event) {
    // var buyerAccount = "0x05bBCA5A53C1D93D7e1cE3231ffecC98d46bdb08";
    // alert("Buyer Account: " + buyerAccount);
    window.location.href = "./seller.html";
    console.log("test");
  },

  buyerEvent: function (event) {
    // var sellerAccount = "0xCAf8e61acF4F4E96aC35020b458d4Dd6639d5Af8";
    // alert("Seller Account: " + sellerAccount);
    window.location.href = "./buyer.html";
    console.log("test");
  },

  cancelEvent: function (event) {
    alert(
      "Transaction has been canceled, ether has been refunded. Block has been mined"
    );
    console.log("test");
  },

  completeEvent: function (event) {
    alert("Transaction has been completed, block has been mined");
    console.log("test");
  },

  confirmEvent: function () {
    App.contracts.Purchase.deployed()
      .then(function (instance) {
        transactionInstance = instance;
        return transactionInstance.confirmPurchase();
      })
      .catch(function (err) {
        console.log(err.message);
      });

    alert("Item has been purchased.");
  },

  receivedEvent: function (event) {
    alert("You successfully confirmed that the item has been received");
    console.log("test");
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
