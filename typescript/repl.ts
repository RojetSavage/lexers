import * as readline from 'node:readline';
import { Lexer, TokenType } from './lexer';

const repl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function acceptInput() {
  repl.question('... ', (input) => {
    let lexer = new Lexer(input);
    lexer.readChar();
    while (true) {
      let token = lexer.nextToken();
      console.log(token);

      if (token.type === TokenType.Eof || token.type === TokenType.Illegal) {
        break;
      }
    }
  });
}
export { repl, acceptInput }




