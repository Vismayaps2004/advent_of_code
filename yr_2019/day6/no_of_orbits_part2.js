import { input } from "./input2.js";
import { intersect, withoutAll } from "jsr:@std/collections";
const pathToSanta = ({ san, you }) => {
  const intersectPath = intersect(san, you);
  const ofSanta = withoutAll(san, intersectPath);
  const ofYou = withoutAll(you, intersectPath);
  return [...ofSanta,...ofYou];
};

const traverse = (orbit, object, path = [], san = [], you = []) => {
  if (object === "SAN") san.push(...path);
  if (object === "YOU") you.push(...path);
  if (!orbit[object]) return { san, you };
  let paths;
  for (let i = 0; i < orbit[object].length; i++) {
    const next = orbit[object][i];
    paths = traverse(orbit, next, path.concat(object), san, you);
  }
  return paths;
};

const getOrbitList = (mapOfOrbit) => {
  const orbitList = mapOfOrbit.reduce((allOrbits, obj) => {
    const direction = obj.split(")");
    const path = direction[direction.length - 1];
    if (allOrbits[direction[0]]) {
      allOrbits[direction[0]].push(path);
      return allOrbits;
    }
    allOrbits[direction[0]] = [path];
    return allOrbits;
  }, {});
  const path = traverse(orbitList, "COM");
  return pathToSanta(path).length;
};

const main = () => {
  const result = getOrbitList(input);
  console.log(result);
};

main();
