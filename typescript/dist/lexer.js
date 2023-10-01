"use strict";
//type TokenType = string;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    //Special types
    TokenType["Illegal"] = "ILLEGAL";
    TokenType["Eof"] = "EOF";
    // Identifiers + literals
    TokenType["Ident"] = "IDENT";
    TokenType["Int"] = "INT";
    // Operators
    TokenType["Assign"] = "=";
    TokenType["Plus"] = "+";
    TokenType["Minus"] = "-";
    TokenType["Bang"] = "!";
    TokenType["Asterisk"] = "*";
    TokenType["Slash"] = "/";
    TokenType["LessThan"] = "<";
    TokenType["GreaterThan"] = ">";
    TokenType["Eq"] = "==";
    TokenType["NotEq"] = "!=";
    // dElimiters
    TokenType["Comma"] = ",";
    TokenType["Semicolon"] = ";";
    TokenType["Lparen"] = "(";
    TokenType["Rparen"] = ")";
    TokenType["Lsquirly"] = "{";
    TokenType["Rsquirly"] = "}";
    // kEywords
    TokenType["Function"] = "FUNCTION";
    TokenType["Let"] = "LET";
    TokenType["True"] = "TRUE";
    TokenType["False"] = "FALSE";
    TokenType["If"] = "IF";
    TokenType["Else"] = "ELSE";
    TokenType["Return"] = "RETURN";
})(TokenType || (exports.TokenType = TokenType = {}));
function isLetter(character) {
    const char = character.charCodeAt(0);
    return ("a".charCodeAt(0) <= char && "z".charCodeAt(0) >= char) || ("A".charCodeAt(0) <= char && "Z".charCodeAt(0) >= char) || (char === "_".charCodeAt(0));
}
function isNumber(character) {
    const char = character.charCodeAt(0);
    return "0".charCodeAt(0) <= char && "9".charCodeAt(0) >= char;
}
const keywords = {
    fn: TokenType.Function,
    let: TokenType.Let,
    true: TokenType.True,
    false: TokenType.False,
    if: TokenType.If,
    else: TokenType.Else,
    return: TokenType.Return
};
function lookUpIdent(ident) {
    if (Object.keys(keywords).includes(ident)) {
        return keywords[ident];
    }
    return TokenType.Ident;
}
class Lexer {
    constructor(input) {
        this.input = input;
        this.position = -1;
        this.readPosition = 0;
        this.currentChar = input[this.position];
    }
    readChar() {
        if (this.readPosition >= this.input.length) {
            this.currentChar = "";
        }
        else {
            this.currentChar = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition++;
    }
    newToken(tokenType, char) {
        return {
            type: tokenType,
            literal: char
        };
    }
    readIdentifier() {
        let startPosition = this.position;
        while (isLetter(this.currentChar)) {
            this.readChar();
        }
        return this.input.slice(startPosition, this.position);
    }
    readNumber() {
        let startPosition = this.position;
        while (isNumber(this.currentChar)) {
            this.readChar();
        }
        return this.input.slice(startPosition, this.position);
    }
    skipWhitespace() {
        if (this.currentChar === " " || this.currentChar === "\t" || this.currentChar === "\n" || this.currentChar === "\r") {
            this.readChar();
        }
    }
    peekChar() {
        if (this.readPosition >= this.input.length)
            return 0;
        else {
            return this.input[this.readPosition];
        }
    }
    nextToken() {
        let newToken = undefined;
        this.skipWhitespace();
        if (this.currentChar == "=") {
            if (this.peekChar() == "=") {
                let char = '=';
                this.readChar();
                newToken = this.newToken(TokenType.Eq, char.concat(this.currentChar));
            }
            else {
                newToken = this.newToken(TokenType.Assign, this.currentChar);
            }
        }
        else if (this.currentChar == ";") {
            newToken = this.newToken(TokenType.Semicolon, this.currentChar);
        }
        else if (this.currentChar == "(") {
            newToken = this.newToken(TokenType.Lparen, this.currentChar);
        }
        else if (this.currentChar == ")") {
            newToken = this.newToken(TokenType.Rparen, this.currentChar);
        }
        else if (this.currentChar == ",") {
            newToken = this.newToken(TokenType.Comma, this.currentChar);
        }
        else if (this.currentChar == "+") {
            newToken = this.newToken(TokenType.Plus, this.currentChar);
        }
        else if (this.currentChar == "{") {
            newToken = this.newToken(TokenType.Lsquirly, this.currentChar);
        }
        else if (this.currentChar == "}") {
            newToken = this.newToken(TokenType.Rsquirly, this.currentChar);
        }
        else if (this.currentChar == "") {
            newToken = this.newToken(TokenType.Eof, "");
        }
        else if (this.currentChar == "-") {
            newToken = this.newToken(TokenType.Minus, this.currentChar);
        }
        else if (this.currentChar == "!") {
            if (this.peekChar() == "=") {
                let char = '!';
                this.readChar();
                newToken = this.newToken(TokenType.NotEq, char.concat(this.currentChar));
            }
            else {
                newToken = this.newToken(TokenType.Bang, this.currentChar);
            }
        }
        else if (this.currentChar == "*") {
            newToken = this.newToken(TokenType.Asterisk, this.currentChar);
        }
        else if (this.currentChar == "/") {
            newToken = this.newToken(TokenType.Slash, this.currentChar);
        }
        else if (this.currentChar == "<") {
            newToken = this.newToken(TokenType.LessThan, "");
        }
        else if (this.currentChar == ">") {
            newToken = this.newToken(TokenType.GreaterThan, "");
        }
        if (isLetter(this.currentChar)) {
            let literal = this.readIdentifier();
            newToken = this.newToken(lookUpIdent(literal), literal);
            return newToken;
        }
        else if (isNumber(this.currentChar)) {
            let literal = this.readNumber();
            newToken = this.newToken(TokenType.Int, literal);
            return newToken;
        }
        else if (newToken === undefined) {
            newToken = this.newToken(TokenType.Illegal, this.currentChar);
        }
        this.readChar();
        return newToken;
    }
}
exports.Lexer = Lexer;
