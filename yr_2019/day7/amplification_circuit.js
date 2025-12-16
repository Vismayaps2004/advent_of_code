import { data } from "./input.js";
import { permutations } from "jsr:@std/collections";

const getmode = (value, base) => Math.floor((value / base) % 10);

const add = (a, b) => a + b;

const executeInstructions = (intCode, ps, op) => {
  let isHalt = false;
  let index = 0;
  while (!isHalt) {
    const operation = intCode[index] % 100;
    const paramModes = {
      0: (index) => intCode[intCode[index]],
      1: (index) => intCode[index],
    };
    
    const instructions = {
      1: () => {
        const hundreds = getmode(intCode[index], 100);
        const thousands = getmode(intCode[index], 1000);
        intCode[intCode[index + 3]] = paramModes[hundreds](index + 1) +
          paramModes[thousands](index + 2);
    
        return index + 4;
      },
      2: () => {
        const hundreds = getmode(intCode[index], 100);
        const thousands = getmode(intCode[index], 1000);
        intCode[intCode[index + 3]] = paramModes[hundreds](index + 1) *
          paramModes[thousands](index + 2);
        return index + 4;
      },
      3: () => {
        const input = prompt("enter number");
    
        intCode[intCode[index + 1]] = parseInt(input);
        return index + 2;
      },
      4: () => {
        console.log("output", intCode[intCode[index + 1]]);
        return index + 2;
      },
      5: () => {
        const mode1 = getmode(intCode[index], 100);
        const mode2 = getmode(intCode[index], 1000);
        if (paramModes[mode1](index + 1) !== 0) {
          return paramModes[mode2](index + 2);
        }
        return index + 3;
      },
      6: () => {
        const mode1 = getmode(intCode[index], 100);
        const mode2 = getmode(intCode[index], 1000);
        if ((paramModes[mode1](index + 1)) === 0) {
          return paramModes[mode2](index + 2);
        }
        return index + 3;
      },
      7: () => {
        const mode1 = getmode(intCode[index], 100);
        const mode2 = getmode(intCode[index], 1000);
        if (paramModes[mode1](index + 1) < paramModes[mode2](index + 2)) {
          intCode[intCode[index + 3]] = 1;
          return index + 4;
        }
        intCode[intCode[index + 3]] = 0;
        return index + 4;
      },
      8: () => {
        const mode1 = getmode(intCode[index], 100);
        const mode2 = getmode(intCode[index], 1000);
        if (paramModes[mode1](index + 1) === paramModes[mode2](index + 2)) {
          intCode[intCode[index + 3]] = 1;
          return index + 4;
        }
        intCode[intCode[index + 3]] = 0;
        return index + 4;
      },
      99: () => isHalt = true,
    };
    index = instructions[operation]();
  }
  return intCode[0];
};

const getThrustSignals = (combinations) => {
  const thrusterSignal = [];
  for (let i = 0; i < combinations.length; i++) {
    let op = 0;
    for (let j = 0; j < i.length; j++)
      op = executeInstructions([...data], i[j], op);
    console.log({op,i});
    
    thrusterSignal.push(op);
  }
  return thrusterSignal;
};

const main = () => {
  executeInstructions(data);
  // const combinations = permutations([0, 1, 2, 3, 4]);
  // const thrusterSignal = getThrustSignals(combinations);
};

main();
