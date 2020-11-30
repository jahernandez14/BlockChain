module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      from: "1AEe87157c3998661317e648E5Dd9652af62578D",
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  }
};
