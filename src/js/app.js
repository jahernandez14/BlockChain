// ENTER SELLER AND BUYER ADDRESSES HERE
var SELLER_ADDR = "0xd88FDc8BE77006B755244247936ED3C61895F331";
var BUYER_ADDR = "0xbb8d5585C89060fcF1Ab920d81fE593199eD81Ee";
App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      console.log(window.ethereum)
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
    $(document).on("click", ".seller", App.handleSeller);
    $(document).on("click", ".buyer", App.handleBuyer);
    $(document).on("click", ".abort", App.handleAbort);
    $(document).on("click", ".complete", App.handleRefundSeller);
    $(document).on("click", ".confirmpurchase", App.handleConfirmPurchase);
    $(document).on("click", ".confirm-received", App.handleConfirmReceived);
    $(document).on("click", ".state", App.handleState);
  },

  handleAbort() {
    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      return purchaseinstance.abort({ from: SELLER_ADDR });
    }).catch(err => console.log(err.message));
  },

  handleConfirmPurchase() {
    var purchaseinstance;
    console.log("Inside confirm purchase");
    App.contracts.Purchase.deployed().then(instance => {
      console.log(instance);
      purchaseinstance = instance;
      return purchaseinstance.confirmPurchase({ from: BUYER_ADDR, value: "2000000000000000000" });
    }).catch(err => console.log(message));
  },

  handleConfirmReceived() {
    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      return purchaseinstance.confirmReceived({ from: BUYER_ADDR });
    }).then(result => console.log(result)).catch(err => console.log(message));
  },

  handleRefundSeller() {
    console.log('refunding seller ', SELLER_ADDR);

    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      return purchaseinstance.refundSeller({ from: SELLER_ADDR });
    }).then(result => console.log(result)).catch(err => console.log(err.message));
  },

  handleState() {
    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      purchaseinstance.state.call().then(value => {
        console.log(value)
        return value;
      });
    }).catch(err => console.log(err.message));
  },

  handleSeller() {
    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      purchaseinstance.seller.call().then(value => {
        console.log(value)
        return value;
      });
    }).catch(err => console.log(err.message));
  },

  handleBuyer() {
    var purchaseinstance;
    App.contracts.Purchase.deployed().then(instance => {
      purchaseinstance = instance;
      purchaseinstance.buyer.call().then(value => {
        console.log(value)
        return value;
      });
    }).catch(err => console.log(err.message));
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});