# BlockChain

The following tutorial was used https://www.trufflesuite.com/tutorials/pet-shop

Use it to replicate the environment.

Environment created in Ubuntu 20.04.01 LTS

# Installation

To install the necessary packages run the following command: `npm i`

# Prerequisites to run

* Make sure you have Ganache running
* Make sure metamask is installed in your browser

# Running the app

## Running truffle

* To run truffle, make sure to replace all instances of BUYER_ADDR and SELLER_ADDR in the project with the wallet addresses you want to use
* Run `truffle compile`
* Run `truffle migrate`

## Running the frontend

* Inside metamask, be sure to import both the buyer and the seller from the secret key in Ganache
* Run `npm run dev`