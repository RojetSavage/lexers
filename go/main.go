package main

import "fmt"

type TokenType string

const (
	Illegal     TokenType = "ILLEGAL"
	Eof         TokenType = "EOF"
	Ident       TokenType = "IDENT"
	Int         TokenType = "INT"
	Assign      TokenType = "="
	Plus        TokenType = "+"
	Minus       TokenType = "-"
	Bang        TokenType = "!"
	Asterisk    TokenType = "*"
	Slash       TokenType = "/"
	LessThan    TokenType = "<"
	GreaterThan TokenType = ">"
	Eq          TokenType = "=="
	NotEq       TokenType = "!="
	Comma       TokenType = ","
	Semicolon   TokenType = ";"
	Lparen      TokenType = "("
	Rparen      TokenType = ")"
	Lsquirly    TokenType = "{"
	Rsquirly    TokenType = "}"
	Dash        TokenType = "-"
	Function    TokenType = "FUNCTION"
	Let         TokenType = "LET"
	True        TokenType = "TRUE"
	False       TokenType = "FALSE"
	If          TokenType = "IF"
	Else        TokenType = "ELSE"
	Return      TokenType = "RETURN"
)

type Token struct {
	Type    TokenType
	Literal string
}

func isLetter(character string) bool {
	if character == "" {
		return false
	}
	char := character[0]
	return ('a' <= char && char <= 'z') || ('A' <= char && char <= 'Z') || char == '_'
}

func isNumber(character string) bool {
	if character == "" {
		return false
	}
	char := character[0]
	return '0' <= char && char <= '9'
}

var keywords = map[string]TokenType{
	"fn":     Function,
	"let":    Let,
	"true":   True,
	"false":  False,
	"if":     If,
	"else":   Else,
	"return": Return,
}

func lookUpIdent(ident string) TokenType {
	if tokenType, ok := keywords[ident]; ok {
		return tokenType
	}
	return Ident
}

type Lexer struct {
	input        string
	position     int
	readPosition int
	currentChar  string
}

func NewLexer(input string) *Lexer {
	lexer := &Lexer{input: input, position: -1, readPosition: 0}
	lexer.readChar()
	return lexer
}

func (l *Lexer) readChar() {
	if l.readPosition >= len(l.input) {
		l.currentChar = ""
	} else {
		l.currentChar = string(l.input[l.readPosition])
	}
	l.position = l.readPosition
	l.readPosition++
}

func (l *Lexer) newToken(tokenType TokenType, char string) Token {
	return Token{
		Type:    tokenType,
		Literal: char,
	}
}

func (l *Lexer) readIdentifier() string {
	startPosition := l.position
	for isLetter(l.currentChar) {
		l.readChar()
	}
	return l.input[startPosition:l.position]
}

func (l *Lexer) readNumber() string {
	startPosition := l.position
	for isNumber(l.currentChar) {
		l.readChar()
	}
	return l.input[startPosition:l.position]
}

func (l *Lexer) skipWhitespace() {
	for l.currentChar == " " || l.currentChar == "\t" || l.currentChar == "\n" || l.currentChar == "\r" {
		l.readChar()
	}
}

func (l *Lexer) peekChar() string {
	if l.readPosition >= len(l.input) {
		return ""
	}
	return string(l.input[l.readPosition])
}

func (l *Lexer) nextToken() Token {
	var newToken Token

	l.skipWhitespace()

	switch l.currentChar {
	case "=":
		if l.peekChar() == "=" {
			char := "="
			l.readChar()
			newToken = l.newToken(Eq, char+l.currentChar)
		} else {
			newToken = l.newToken(Assign, l.currentChar)
		}
	case ";":
		newToken = l.newToken(Semicolon, l.currentChar)
	case "(":
		newToken = l.newToken(Lparen, l.currentChar)
	case ")":
		newToken = l.newToken(Rparen, l.currentChar)
	case ",":
		newToken = l.newToken(Comma, l.currentChar)
	case "+":
		newToken = l.newToken(Plus, l.currentChar)
	case "{":
		newToken = l.newToken(Lsquirly, l.currentChar)
	case "}":
		newToken = l.newToken(Rsquirly, l.currentChar)
	case "-":
		newToken = l.newToken(Minus, l.currentChar)
	case "!":
		if l.peekChar() == "=" {
			char := "!"
			l.readChar()
			newToken = l.newToken(NotEq, char+l.currentChar)
		} else {
			newToken = l.newToken(Bang, l.currentChar)
		}
	case "*":
		newToken = l.newToken(Asterisk, l.currentChar)
	case "/":
		newToken = l.newToken(Slash, l.currentChar)
	case "<":
		newToken = l.newToken(LessThan, "<")
	case ">":
		newToken = l.newToken(GreaterThan, ">")
	case "":
		newToken = l.newToken(Eof, "eof")
	}

	if isLetter(l.currentChar) {
		literal := l.readIdentifier()
		newToken = l.newToken(lookUpIdent(literal), literal)
		return newToken
	} else if isNumber(l.currentChar) {
		literal := l.readNumber()
		newToken = l.newToken(Int, literal)
		return newToken
	} else if newToken == (Token{}) {
		newToken = l.newToken(Illegal, "Illegal")
	}

	l.readChar()

	return newToken
}

func main() {
	input := "let x = 5 + 10;"
	lexer := NewLexer(input)
	lexer.readChar()
	for {
		token := lexer.nextToken()
		fmt.Printf("%+v\n", token)

		if token.Type == Eof {
			break
		}
	}
}
