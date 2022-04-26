const StringToArray = (vet) => {
    let vet1 = []
    let cont = 0;
    let size
    if (vet) {
        for (let i in vet) {
            switch (vet[i]) {
                case '1':
                    size = 'P';
                    break;
                case '2':
                    size = 'PP';
                    break;
                case '3':
                    size = 'M';
                    break;
                case '4':
                    size = 'G';
                    break;
                case '5':
                    size = 'GG';
                    break;
            }
            vet1.push({
                id: cont,
                item: size
            })
            cont++;
        }
    }
    return vet1
}
const Conversao = (valor) => {
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return valor
}

module.exports = {
    Conversao,
    StringToArray
}