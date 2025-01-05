# Elementals by Artinals

Before mainnet deployment you should remove the test_only functions.

### Documentation
The contract has generated documentation that you can find in [./docs](./docs/).

### Scripts
In the [scripts](./scripts/) folder you can find examples of how to interact with the contract. 
- The [mintElement](./scripts/mintElement.ts) script is an example of minting the ElementNFT to user.
- The [mintAvatar](./scripts/mintAvatar.ts) script is an example of how we can pay gas for a user's AvatarNFT minting call.

## Install or update Sui
  - Be sure to make sure you have an up-to-date version of the client. Run the following command to install or update Sui binaries from the `mainnet` branch if you want to deploy to `mainnet` and `devnet`, if you want to deploy to `devnet` (in this case also change the revision of Sui in `Move.toml` to `"framework/devnet"`):

    ```
    cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui
    ```

## Build

 - Make sure your terminal or console is in the directory that contains your package. Use the following command to build your package:
    ```
    sui move build
    ```
## Deploy
 - The Sui CLI command for deploying the package is the following:
 
    ```
    sui client publish --gas-budget 200000000
    ```
   
    For the gas_budget, we can use a standard value like `200000000`, but this does not mean that this value will be sufficient for each of the operations.

## Test
### Sui simulation tests

 - To run the simulation tests, you need to execute the following command:
    ```
    sui move test
    ```

### End-to-end tests
 
 - To run the end-to-end tests, you need to execute the following set of commands:
 
    ```
    npm install
    npm run test
    ```
>[!WARNING]
Make sure you have the latest stable version of Node.js and npm installed.

    


    sui client call --package 0x6fb5b6c0ea8e88de1c417b3b20bab5cf32aa414562ef5f4b0fb25a4dfbbb3077 \
    --module ART20 \
    --function set_fee \
    --type-args 0xa6bb9e053fd0d03afa99945c35a40953e0b30f986d451be005a860fcd171d60e::artfi::ARTFI \
    --args 0x60a341eac61baf6d9571011ad497fac7c75a1b09e096cdfd5b9a74505c64bca1 \
           0 \
    --gas-budget 100000000