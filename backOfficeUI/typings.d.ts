// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html
/// <reference path="./node_modules/@types/lodash/index.d.ts" />
/// <reference path="./node_modules/@types/node/index.d.ts" />
/// <reference path="./node_modules/@types/jquery/index.d.ts" />

// Build Variables
declare var TARGET: string;
declare var TARGET_ENV: string;

// Vendors' typings
declare var _: _.LoDashStatic;
declare var sinon: any;
declare var $: JQueryStatic;
