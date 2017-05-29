## Citrus JavaScript library
This library is intended to be used by e-commerce providers using Citrus system.
It provides access to Citrus API for requesting ads and registering clicks.

## How to build
Building this project requires:
 - Java
 - Maven
 - npm

Once all above are installed these steps should be taken:
 - Run `mvn compile` to generate required code.
 - Run `npm install` to get all JavaScript dependencies.
 - Run `./node_modules/webpack/bin/webpack.js -p` to create a prodcution distribution.
 Output will be put in `dist` folder.
 
## Installing using npm
This package will be put on npm in near future.

## How to use
For an example of a usage of the library see `/src/example` 
folder.