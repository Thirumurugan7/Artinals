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
    sui client publish --gas-budget <gas_budget>
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

    