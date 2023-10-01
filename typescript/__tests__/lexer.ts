import { Lexer, TokenType } from '../lexer';
const test1tokens = [
    TokenType.Assign,
    TokenType.Plus,
    TokenType.Lparen,
    TokenType.Rparen,
    TokenType.Lsquirly,
    TokenType.Rsquirly,
    TokenType.Comma,
    TokenType.Semicolon,
];

const test2tokens = [
      {type: TokenType.Let, literal: "let"},
      { type: TokenType.Ident, literal: "five" },
      {type: TokenType.Assign, literal: "="},
      { type: TokenType.Int, literal: "5" },
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Let, literal: "let"},
      { type: TokenType.Ident, literal: "ten" },
      {type: TokenType.Assign, literal: "="},
      { type: TokenType.Int, literal: "10" },
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Let, literal: "let"},
      { type: TokenType.Ident, literal: "add" },
      {type: TokenType.Assign, literal: "="},
      {type: TokenType.Function, literal: "fn"},
      {type: TokenType.Lparen, literal: "("},
      { type: TokenType.Ident, literal: "x" },
      {type: TokenType.Comma, literal: ","},
      { type: TokenType.Ident, literal: "y" },
      {type: TokenType.Rparen, literal: ")"},
      {type: TokenType.Lsquirly, literal: "{"},
      { type: TokenType.Ident, literal: "x" },
      {type: TokenType.Plus, literal: "+"},
      { type: TokenType.Ident, literal: "y" },
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Rsquirly, literal: "}"},
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Let, literal: "let"},
      { type: TokenType.Ident, literal: "result" },
      {type: TokenType.Assign, literal: "="},
      { type: TokenType.Ident, literal: "add" },
      {type: TokenType.Lparen, literal: "("},
      { type: TokenType.Ident, literal: "five" },
      {type: TokenType.Comma, literal: ","},
      { type: TokenType.Ident, literal: "ten" },
      {type: TokenType.Rparen, literal: ")"},
      {type: TokenType.Semicolon, literal: ";"},

      {type: TokenType.Bang, literal: "!"},
      {type: TokenType.Dash, literal: "-"},
      {type: TokenType.Slash, literal: "/"},
      {type: TokenType.Asterisk, literal: "*"},
      { type: TokenType.Int, literal: "5" },
      {type: TokenType.Semicolon, literal: ";"},
      { type: TokenType.Int, literal: "5" },
      {type: TokenType.LessThan, literal: "<"},
      { type: TokenType.Int, literal: "10" },
      {type: TokenType.GreaterThan, literal: ">"},
      { type: TokenType.Int, literal: "5" },
      {type: TokenType.Semicolon, literal: ";"},

      {type: TokenType.If, literal: "if"},
      {type: TokenType.Lparen, literal: "("},
      { type: TokenType.Int, literal: "5" },
      {type: TokenType.LessThan, literal: "<"},
      { type: TokenType.Int, literal: "10" },
      {type: TokenType.Rparen, literal: ")"},
      {type: TokenType.Lsquirly, literal: "{"},
      {type: TokenType.Return, literal: "return"},
      {type: TokenType.True, literal: "true"},
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Rsquirly, literal: "}"},
      {type: TokenType.Else, literal: "else"},
      {type: TokenType.Lsquirly, literal: "{"},
      {type: TokenType.Return, literal: "return"},
      {type: TokenType.False, literal: "false"},
      {type: TokenType.Semicolon, literal: ";"},
      {type: TokenType.Rsquirly, literal: "}"},

      { type: TokenType.Int, literal: "10" },
      {type: TokenType.Eq, literal: "=="},
      { type: TokenType.Int, literal: "10" },
      {type: TokenType.Semicolon, literal: ";"},
      { type: TokenType.Int, literal: "10" },
      {type: TokenType.NotEq, literal: "!="},
      { type: TokenType.Int, literal: "9" },
      {type: TokenType.Semicolon, literal: ";"},

        {type: TokenType.Eof, literal: "eof"},
    ];

test("test getNextToken with simple string", function() {
  let inputStr = "=+(){},;"
  let myLexer = new Lexer(inputStr)
  myLexer.readChar();

  for (const token of test1tokens){
    expect(myLexer.nextToken()?.type).toBe(token)
  }
})

test("test getNextToken with string which includes identifiers and whitespace", function() {
    const inputStr =`let five = 5;
    let ten = 10;
    let add = fn(x, y) {
        x + y;
    };
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;
    if (5 < 10) {
        return true;
    } else {
        return false;
    }

    10 == 10;
    10 != 9;
    `;

  let myLexer = new Lexer(inputStr)
  myLexer.readChar();

  for (const token of test2tokens){
    expect(myLexer.nextToken()?.type).toBe(token.type)
  }
})

