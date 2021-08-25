//remove duplicates by key in array of objects
function removeDuplicates(data: any[], key: string) {
  return data.filter(
    (v: Object, i: Number, origArray: Array<[Object]>) =>
      origArray.findIndex((t: Object) => t[key] === v[key]) === i
  );
}

export { removeDuplicates };
