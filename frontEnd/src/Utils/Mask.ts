const formatAndLimit = (valor:string, max:number) => {
    return (valor).replace(/[\D]+/g, '').substring(0, max)
}

export const CNPJ = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 14);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 2) newValor += ".";
        if (index === 5) newValor += ".";
        if (index === 8) newValor += "/";
        if (index === 12) newValor += "-";
        newValor += val;
    })
    return newValor;
}

export const CPFMASK = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 11);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 3) newValor += ".";
        if (index === 6) newValor += ".";
        if (index === 9) newValor += "-";
        newValor += val;
    })
    return newValor;
}

export const RGMASK = (valor:string|number) => {
    // let format = formatAndLimit(String(valor), 9);
    // const arr = format.split("");
    // let newValor = "";
    // arr.forEach((val, index) => {
    //     if (index === 2) newValor += ".";
    //     if (index === 5) newValor += ".";
    //     if (index === 8) newValor += "-";
    //     newValor += val;
    // })
    // return newValor;
    return String(valor).toUpperCase();
}

export const TELMASK = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 10);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 0) newValor += "(";
        if (index === 2) newValor += ") ";
        if (index === 6) newValor += " - ";
        newValor += val;
    })
    return newValor;
}

export const CELMASK = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 11);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 0) newValor += "(";
        if (index === 2) newValor += ")";
        if (index === 3) newValor += " ";
        if (index === 7) newValor += " - ";
        newValor += val;
    })
    return newValor;
}

export const PISMASK = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 11);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 3) newValor += ".";
        if (index === 8) newValor += ".";
        if (index === 9) newValor += "-";
        newValor += val;
    })
    return newValor;
}

export const CEPMASK = (valor:string|number) => {
    let format = formatAndLimit(String(valor), 8);
    const arr = format.split("");
    let newValor = "";
    arr.forEach((val, index) => {
        if (index === 5) newValor += "-";
        newValor += val;
    })
    return newValor;
}
