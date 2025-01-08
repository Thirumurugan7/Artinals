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

    


    sui client call --package 0x2b8bdb183a381c8010eeb020dbbbc6e1fa1203e00d4550b49048ceb722794af4 \
    --module ART20 \
    --function set_fee \
    --type-args 0x706fa7723231e13e8d37dad56da55c027f3163094aa31c867ca254ba0e0dc79f::artfi::ARTFI \
    --args 0xb88c99b9e703b09452dff057ee8d008e8d463e328ed9bdcc38f4d18ec4545630 \
           0 \
    --gas-budget 100000000

    sui client call --package 0xaf91594f5053f111e2c640026dfeb2c320c0457e0f0f46e2917e2f905ab58183 \
    --module ART20 \
    --function set_fee \
    --type-args 0xa6bb9e053fd0d03afa99945c35a40953e0b30f986d451be005a860fcd171d60e::artfi::ARTFI \
    --args 0x4e6fec2e2d7592d2821bac995adc26f001f6afdfed8461ea79bf392accb0bd84 \
           0 \
    --gas-budget 100000000



    the arg is fee config address




created collection

Fire 0xb639f39ca5c0486c5675dca1f64a8cc1c1dc25a3462036f2f97f32797e691fd4
Water  0x6a179785a21ca10c63c624d06062c91f4274501af53aae0c66689200dadccf14
Aether 0x4e7de81009ad6c82353163b2b761cab44ddf51ad8e2ab7b135f20475490efd6f




earth 0x216741680977f593b5f94ded0b964f6ee13e9c195dd2fe08f8e306ce0c0764d0
fire 0xd2a743b472bbc5ee0f234d3129b6777b6e8debd91c3a9cb4494c4771cd859136
Air  0xfad792474fb10ac40ba8cb8737fcf3ee6ae2c37e20ad8f480cb557ff1bc9431d
Water 0x8eebe628d8b53334eea7bd31963db8834c3c7f7ceee98e1f0d4e309cb8b88591
Aether 0x2a6b9286ae8b3ab27a2fb0c6feff894904f625392e69d5ede900b1f1adf37bdd




last mainnet

air 0x97a43422e5f38e8dc45f1d82fe6ae52faf1508f6c26de9ca085e575ed93747f7
water 0x678fb5aadd1e220aef09ea49e5d84af5a83d6be7cc5945d91e8a8f590fb32f32
Earth 0xf39a586511a3b4257e7e16f6946e7b0d8780704d706034a37f7925f496cc02e0
Fire 0x879924b37c4a11cc60d01519adc6178b775166752e1ba93f39553a0e2e7b7d5c
Aether 0xe65a57382cba99dc4e26b4f6032c7924e114f35ee970d827ecf2f3213fde4713



fucking heell  wejv
air 0x7b70bed16ff822347b54eed1f25e3d0f1e8d3ede839ef79413b7e00e8195aa65
water 0x678fb5aadd1e220aef09ea49e5d84af5a83d6be7cc5945d91e8a8f590fb32f32
Earth 0xf39a586511a3b4257e7e16f6946e7b0d8780704d706034a37f7925f496cc02e0
Fire 0x879924b37c4a11cc60d01519adc6178b775166752e1ba93f39553a0e2e7b7d5c
Aether 0xe65a57382cba99dc4e26b4f6032c7924e114f35ee970d827ecf2f3213fde4713