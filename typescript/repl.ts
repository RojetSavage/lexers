import * as readline from 'node:readline';
import { Lexer, TokenType } from './lexer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => console.log('Aborting typescript lexer'))
rl.on('close', () => console.log('Closing typescript lexer'))

async function* inputGenerator(query: string) {
  try {
    for (; ;) {
      yield new Promise((resolve) => rl.question(query, resolve));
    }
  } finally {
    rl.close();
  }
}

async function runRepl() {
  for await (const input of inputGenerator("$: ")) {
    let lexer = new Lexer(input as string);
    lexer.readChar();
    while (true) {
      let token = lexer.nextToken();
      console.log(token);

      if (token?.type === TokenType.Eof) {
        break;
      } 
      
      if (token?.type === TokenType.Illegal) {
        break;
      } 
    }
  }
}

export { runRepl }
