using System;
using System.Collections.Generic;

public enum TokenType
{
    Illegal,
    Eof,
    Ident,
    Int,
    Assign,
    Plus,
    Minus,
    Bang,
    Asterisk,
    Slash,
    LessThan,
    GreaterThan,
    Eq,
    NotEq,
    Comma,
    Semicolon,
    Lparen,
    Rparen,
    Lsquirly,
    Rsquirly,
    Dash,
    Function,
    Let,
    True,
    False,
    If,
    Else,
    Return
}

public class Token
{
    public TokenType Type { get; set; }
    public string Literal { get; set; }
}

public class Lexer
{
    private readonly string input;
    private int position;
    private int readPosition;
    private string currentChar;

    private readonly Dictionary<string, TokenType> keywords = new Dictionary<string, TokenType>
    {
        { "fn", TokenType.Function },
        { "let", TokenType.Let },
        { "true", TokenType.True },
        { "false", TokenType.False },
        { "if", TokenType.If },
        { "else", TokenType.Else },
        { "return", TokenType.Return }
    };

    public Lexer(string input)
    {
        this.input = input;
        position = -1;
        readPosition = 0;
        currentChar = input[position].ToString();
    }

    private void ReadChar()
    {
        if (readPosition >= input.Length)
        {
            currentChar = "";
        }
        else
        {
            currentChar = input[readPosition].ToString();
        }
        position = readPosition;
        readPosition++;
    }

    private Token NewToken(TokenType tokenType, string character)
    {
        return new Token
        {
            Type = tokenType,
            Literal = character
        };
    }

    private string ReadIdentifier()
    {
        int startPosition = position;
        while (IsLetter(currentChar))
        {
            ReadChar();
        }
        return input.Substring(startPosition, position - startPosition);
    }

    private string ReadNumber()
    {
        int startPosition = position;
        while (IsNumber(currentChar))
        {
            ReadChar();
        }
        return input.Substring(startPosition, position - startPosition);
    }

    private void SkipWhitespace()
    {
        while (currentChar == " " || currentChar == "\t" || currentChar == "\n" || currentChar == "\r")
        {
            ReadChar();
        }
    }

    private string PeekChar()
    {
        if (readPosition >= input.Length)
        {
            return "";
        }
        return input[readPosition].ToString();
    }

    private bool IsLetter(string character)
    {
        if (character[0]) == "" return false
        char c = character[0];
        return (char.IsLetter(c) && c != '_');
    }

    private bool IsNumber(string character)
    {
        if (character[0]) == "" return false
        char c = character[0];
        return char.IsDigit(c);
    }

    public Token NextToken()
    {
        Token newToken = null;

        SkipWhitespace();

        switch (currentChar)
        {
            case "=":
                if (PeekChar() == "=")
                {
                    string character = "=";
                    ReadChar();
                    newToken = NewToken(TokenType.Eq, character + currentChar);
                }
                else
                {
                    newToken = NewToken(TokenType.Assign, currentChar);
                }
                break;
            case ";":
                newToken = NewToken(TokenType.Semicolon, currentChar);
                break;
            case "(":
                newToken = NewToken(TokenType.Lparen, currentChar);
                break;
            case ")":
                newToken = NewToken(TokenType.Rparen, currentChar);
                break;
            case ",":
                newToken = NewToken(TokenType.Comma, currentChar);
                break;
            case "+":
                newToken = NewToken(TokenType.Plus, currentChar);
                break;
            case "{":
                newToken = NewToken(TokenType.Lsquirly, currentChar);
                break;
            case "}":
                newToken = NewToken(TokenType.Rsquirly, currentChar);
                break;
            case "-":
                newToken = NewToken(TokenType.Minus, currentChar);
                break;
            case "!":
                if (PeekChar() == "=")
                {
                    string character = "!";
                    ReadChar();
                    newToken = NewToken(TokenType.NotEq, character + currentChar);
                }
                else
                {
                    newToken = NewToken(TokenType.Bang, currentChar);
                }
                break;
            case "*":
                newToken = NewToken(TokenType.Asterisk, currentChar);
                break;
            case "/":
                newToken = NewToken(TokenType.Slash, currentChar);
                break;
            case "<":
                newToken = NewToken(TokenType.LessThan, "<");
                break;
            case ">":
                newToken = NewToken(TokenType.GreaterThan, ">");
                break;
            case "":
                newToken = NewToken(TokenType.Eof, "eof");
                break;
        }

        if (IsLetter(currentChar))
        {
            string literal = ReadIdentifier();
            newToken = NewToken(LookUpIdent(literal), literal);
            return newToken;
        }
        else if (IsNumber(currentChar))
        {
            string literal = ReadNumber();
            newToken = NewToken(TokenType.Int, literal);
            return newToken;
        }
        else if (newToken == null)
        {
            newToken = NewToken(TokenType.Illegal, "Illegal");
        }

        ReadChar();

        return newToken;
    }

    private TokenType LookUpIdent(string ident)
    {
        if (keywords.ContainsKey(ident))
        {
            return keywords[ident];
        }
        return TokenType.Ident;
    }
}

class Program
{
    static void Main()
    {
        string input = "let x = 5 + 10;";
        Lexer lexer = new Lexer(input);

        while (true)
        {
            Token token = lexer.NextToken();
            Console.WriteLine($"{token.Type} : {token.Literal}");

            if (token.Type == TokenType.Eof)
            {
                break;
            }
        }
    }
}
