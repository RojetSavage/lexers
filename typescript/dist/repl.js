"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInput = exports.repl = void 0;
const readline = __importStar(require("node:readline"));
const lexer_1 = require("./lexer");
const repl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.repl = repl;
function acceptInput() {
    repl.question('... ', (input) => {
        let lexer = new lexer_1.Lexer(input);
        lexer.readChar();
        while (true) {
            let token = lexer.nextToken();
            console.log(token);
            if (token.type === lexer_1.TokenType.Eof || token.type === lexer_1.TokenType.Illegal) {
                break;
            }
        }
    });
}
exports.acceptInput = acceptInput;
