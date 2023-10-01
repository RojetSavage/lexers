//type TokenType = string;

interface Token {
  type : TokenType; 
  literal : string;
}

export enum TokenType {
//Special types
Illegal = "ILLEGAL",
Eof = "EOF",

// Identifiers + literals
Ident = "IDENT", // add, foobar, x, y, ...
Int = "INT", // 1343456

// Operators
Assign = "=",
Plus = "+",
Minus = "-",
Bang = "!",
Asterisk = "*",
Slash = "/",
LessThan = "<",
GreaterThan = ">",
Eq = "==",
NotEq = "!=",

// dElimiters
Comma = ",",
Semicolon = ";",
Lparen = "(",
Rparen = ")",
Lsquirly = "{",
Rsquirly = "}",

// kEywords
Function = "FUNCTION",
Let = "LET",
True = "TRUE",
False = "FALSE",
If = "IF",
Else = "ELSE",
Return = "RETURN"
}

function isLetter(character: string) {
  const char = character.charCodeAt(0);
  return ("a".charCodeAt(0) <= char && "z".charCodeAt(0) >= char) || ("A".charCodeAt(0) <= char && "Z".charCodeAt(0) >= char) || (char === "_".charCodeAt(0));
}

function isNumber(character: string) {
  const char = character.charCodeAt(0);
  return "0".charCodeAt(0) <= char && "9".charCodeAt(0) >= char;  
}

const keywords : Record<string, TokenType>  = {
  fn: TokenType.Function,
  let: TokenType.Let,
  true: TokenType.True,
  false: TokenType.False,
  if: TokenType.If,
  else: TokenType.Else,
  return: TokenType.Return
}

function lookUpIdent(ident: string) : TokenType {
  if (Object.keys(keywords).includes(ident)) {
    return keywords[ident]; 
  }
  return TokenType.Ident;
}

export class Lexer {
  private input: string;
  private position: number;
  private readPosition: number;
  private currentChar: string;
 
  constructor(input: string){
    this.input = input; 
    this.position = -1;
    this.readPosition = 0;
    this.currentChar = input[this.position];
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.currentChar = "";
    } else {
      this.currentChar = this.input[this.readPosition]
    }
    this.position = this.readPosition;
    this.readPosition++;
  }

  newToken(tokenType: TokenType, char: string): Token {
    return { 
      type: tokenType,
      literal: char 
    }
  }

  readIdentifier():string {
    let startPosition = this.position;
    while (isLetter(this.currentChar)) {
      this.readChar();
    }
    return this.input.slice(startPosition, this.position)
  }

  readNumber():string {
    let startPosition = this.position;
    while (isNumber(this.currentChar)) {
      this.readChar();
    }
    return this.input.slice(startPosition, this.position)
  }

  skipWhitespace() {
    if (this.currentChar === " " || this.currentChar === "\t" || this.currentChar === "\n" || this.currentChar === "\r") {
      this.readChar();
    }
  }

  peekChar() : string | number {
    if (this.readPosition >= this.input.length) return 0;
    else {
      return this.input[this.readPosition];
    }
  }

  nextToken(): Token  {
    let newToken: Token | undefined = undefined;

    this.skipWhitespace();
  
    if (this.currentChar == "=") {
      if (this.peekChar() == "=") {
        let char = '=';
        this.readChar();
        newToken = this.newToken(TokenType.Eq, char.concat(this.currentChar))
      } else {
        newToken = this.newToken(TokenType.Assign, this.currentChar)
      }
    } else if (this.currentChar == ";") {
      newToken = this.newToken(TokenType.Semicolon, this.currentChar)
    } else if (this.currentChar == "(") {
      newToken = this.newToken(TokenType.Lparen, this.currentChar)
    } else if (this.currentChar == ")") {
      newToken = this.newToken(TokenType.Rparen, this.currentChar)
    } else if (this.currentChar == ",") {
      newToken = this.newToken(TokenType.Comma, this.currentChar)
    } else if (this.currentChar == "+") {
      newToken = this.newToken(TokenType.Plus, this.currentChar)
    } else if (this.currentChar == "{") {
      newToken = this.newToken(TokenType.Lsquirly, this.currentChar)
    } else if (this.currentChar == "}") {
      newToken = this.newToken(TokenType.Rsquirly, this.currentChar)
    } else if (this.currentChar == "") {
      newToken = this.newToken(TokenType.Eof, "")
    } else if (this.currentChar == "-") {
      newToken = this.newToken(TokenType.Minus, this.currentChar)
    } else if (this.currentChar == "!") {
        if (this.peekChar() == "=") {
          let char = '!';
          this.readChar();
          newToken = this.newToken(TokenType.NotEq, char.concat(this.currentChar))
        } else {
          newToken = this.newToken(TokenType.Bang, this.currentChar)
        }
    } else if (this.currentChar == "*") {
      newToken = this.newToken(TokenType.Asterisk, this.currentChar)
    } else if (this.currentChar == "/") {
      newToken = this.newToken(TokenType.Slash, this.currentChar)
    } else if (this.currentChar == "<") {
      newToken = this.newToken(TokenType.LessThan, "")
    } else if (this.currentChar == ">") {
      newToken = this.newToken(TokenType.GreaterThan, "")
    } 


    if (isLetter(this.currentChar)) {
      let literal = this.readIdentifier();
      newToken = this.newToken(lookUpIdent(literal), literal);
      return newToken;
    } else if (isNumber(this.currentChar)) {
      let literal = this.readNumber();
      newToken = this.newToken(TokenType.Int, literal);
      return newToken;
    } else if (newToken === undefined) {
      newToken = this.newToken(TokenType.Illegal, this.currentChar);
    }

    this.readChar();

    return newToken;
  }

}

