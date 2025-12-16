import { map } from "./input.js";

const traverse = (orbit, object, sum) => {
  if (!orbit[object]) return sum;
  let distance = sum;
  for (let i = 0; i < orbit[object].length; i++) {
    const next = orbit[object][i];
    const total = sum + 1;
    // console.log({ i, object, next, total });
    distance += traverse(orbit, next, total);
  }
  return distance;
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
  return traverse(orbitList, "COM", 0);
};

const main = () => {
  const result = getOrbitList(map);
  console.log(result);
  
};

main();
