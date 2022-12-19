

const zip = (a: Array<any>, b: Array<any>) => {
    a.map((k, i) => [k, b[i]]);
}