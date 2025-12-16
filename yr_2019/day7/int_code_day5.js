// import { data } from "./input.js";

const getMode = (opCode) => {
  const hundreds = Math.floor((opCode / 100) % 10);
  const thousands = Math.floor((opCode / 1000) % 10);
  return [hundreds, thousands];
};

let computer = {
  program: [102, 5, 1, 0, 99, 1, 0, 0, 0, 99],
  isHalt: false,
  index: 0,
};

const paramModes = {
  0: (program, index) => program[program[index]],
  1: (program, index) => program[index],
};

const add = (a, b) => a + b;

const mul = (a, b) => a * b;

const executeInstruction = (computer) => {
  let { program, isHalt, index } = computer;
  while (!isHalt) {
    const operation = program[index] % 100;
    const [hundreds, thousands] = getMode(program[index]);

    const input1 = paramModes[hundreds](program, index + 1);
    const input2 = paramModes[thousands](program, index + 2);

    const instructions = {
      1: () => {
        program[program[index + 3]] = add(input1, input2);
        return index += 4;
      },
      2: () => {
        program[program[index + 3]] = mul(input1, input2);
        return index += 4;
      },
      99: () => isHalt = true,
    };
    computer.index = instructions[operation]();
  }
  computer = { program, isHalt, index };
  return computer;
};

const main = () => {
  console.log(executeInstruction(computer));
};

main();
