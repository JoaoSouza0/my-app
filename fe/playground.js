const duplicateValues = [
  { id: 1, name: 'joao' },
  { id: 2, name: 'jGeooao' },
  { id: 1, name: 'joao' },
  { id: 1, name: 'joao' },
  { id: 1, name: 'joao' },
  { id: 4, name: 'Maisa' },
];

const obj = {};
duplicateValues.forEach((item) => {
  obj[item.id] = item;
});

console.log(Object.values(obj));
