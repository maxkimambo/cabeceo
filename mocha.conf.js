let chai = require('chai');

// Load assertions globally
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

// load sinon
global.sinon = require('sinon');

// Initialize Chai plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-things'));
