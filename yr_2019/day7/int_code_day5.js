// import { data } from "./input.js";

const getMode = (value, base) => Math.floor((value / base) % 10);

let computer = {
  program: [1, 0, 0, 0, 99, 1, 0, 0, 0, 99],
  isHalt: false,
  index: 0,
};

const paramModes = {
  0: (program, index) => program[program[index]],
  1: (program, index) => program[index],
};

const add = (program, index) => {
  const hundreds = getMode(program[index], 100);
  const thousands = getMode(program[index], 1000);
  return paramModes[hundreds](program, index + 1) +
    paramModes[thousands](program, index + 2);
};

const executeInstruction = (computer) => {
  let { program, isHalt, index } = computer;
  while (!isHalt) {
    const operation = program[index];
    // console.log({ operation, index });
    const instructions = {
      1: () => {
        program[program[index + 3]] = add(program, index);
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
