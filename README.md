# Gelato Gasless Warriors [ Pixel Warriors - The NFT Showdown]

<img width="234" alt="Screenshot 2023-03-26 224358" src="https://user-images.githubusercontent.com/62092256/229061812-146c869a-bb2f-41c5-a30d-6242ab866610.png">

## Introduction
Blockchain technology has the potential to revolutionize the way we conduct financial transactions and exchange assets. However, the complexity of blockchain technology can be a barrier for non-tech users, particularly when it comes to understanding gas fees and storing private keys.

Playing a game which utilizes blockchain technology is not much feasible at the moment I am writing this because user needs to sign the transaction manually after performing anything in the game.

Gas fees are a necessary aspect of blockchain transactions, as they compensate miners for processing transactions on the network. However, they can be a significant source of confusion and frustration for users. Account abstraction allows smart contracts to interact with multiple accounts on behalf of a user, eliminating the need for users to have gas or an Externally-owned account (EOA). Gasless transactions take this concept further by allowing a third party to pay for gas on behalf of the user, removing the need for users to understand gas altogether.

So now the users don't need to worry about their private keys and they can play the game directly on the chain. Without signing transactions every now and then . Also not paying much attention to login and account creation as everything is handled by Gelato Onboarding SDK .

The main aim of account abstraction is to provide users an experience by which they won't even think what is the underlying technology behind the game and this POC achieves the same.

## Screenshots
- Landing Page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/62092256/229060929-da5ade3f-0865-42e5-83ec-6878535543a7.png">

- Select Characters Page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/62092256/229061184-67ed4810-2722-4bc8-a123-e74b12a0ba69.png">

- Fight Page
<img width="960" alt="image" src="https://user-images.githubusercontent.com/62092256/229061413-6ed9055b-87a2-4c84-8232-ca4284289808.png">

- User's NFTs on Opensea
<img width="960" alt="image" src="https://user-images.githubusercontent.com/62092256/229061541-33cea1b2-f0f8-4d53-b839-cf2fc8cc9293.png">


## Features
- User can login using any social account like Google , Discord etc
- They can claim NFTs for free i.e without paying gas fees
- They can mint and burn NFTs by playing the game
- User have to fight with computer to get NFTs
- All minted NFTs will be there on the Opensea
- It is an onchain game which means that every transaction is publicly available at polygon scan
- Users can sell these NFTs to earn money or claim all the NFTs to make the collection by fighting with computer

## TODO
- Instead of card game , will make Indie style game [ this was just for POC that GameFi is possible with account abstraction ]
- Will allow user to build custom characters
- Instead of fighting with computer will add support for 1v1 fight
- The lost players NFT will not be burnt instead it will be demoted only
- Each character will have different attributes
- there will be a global record for all players 
- a lot more to go

## Tech Used
- React
- Typescript
- Gelato Onboarding SDK
- Gelato Gasless Wallet
- Solidity
- Tailwind CSS

## Run it locally
`git clone https://github.com/anukulpandey/gelato`
`cd gelato`
`yarn install`
`yarn start`
