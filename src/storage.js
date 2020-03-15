export const load = name => JSON.parse(localStorage[name] || "{}");
export const save = (name, o) => (localStorage[name] = JSON.stringify(o));

export const create = name => {
  let o = load(name);
  return {
    name,
    get: (p, def) => (o.hasOwnProperty(p) ? o[p] : def),
    set: (p, v) => {
      o[p] = v;
      save(name, o);
    }
  };
};
