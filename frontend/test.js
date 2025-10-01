const t = [{v: 1}, {v: 2}, {v: 3}]

console.log(t.map(o => { o.v }).reduce((s, o) => s + o, 0))