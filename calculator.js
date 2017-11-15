let listaValores = new Array();
let cont = 1;

function adicionarValor() {
    const x = document.querySelector("#xAxis").value;
    const y = document.querySelector("#yAxis").value;
    listaValores.push({x: x, y: y, id: cont});
    cont++;
    reloadListValores();
}

function reloadListValores() { 
    clearDiv();
    if (listaValores.length > 0) {
        let table = '<table class="tabela table-striped table-condensed table-responsive"<tbody><tr><th>Número</th><th>Eixo X</th><th>Eixo Y</th><th>Ação</th></tr>';
        listaValores.forEach(element => {
        let a = '<tr><td>' + element.id + '</td><td>';
        a += element.x + '</td>';
        a += '<td>' + element.y + '</td>';
        a += '<td><button onclick="deletePoint(\'' + element.id + '\')">Remover</button></td>'
        table += a; 
    });
    table += '</tbody></table>';
    document.querySelector("#valoresInseridos").innerHTML = table;
    }
}

function clearDiv() {
    document.querySelector("#valoresInseridos").innerHTML = "";
}

function deletePoint(id) {
    listaValores = listaValores.filter(element => element.id != id);
    reloadListValores();
}

function calcularMMQ() {
    document.querySelector("#resultadoMMQ").innerHTML = "";
    let MMQ = "<h1>Passo a Passo</h1>";
    MMQ += "$$ a = &#92;frac{[&#92;sum_i x_{i}][&#92;sum_i y_{i}] - n[&#92;sum_i x_{i}y_{i}]}{[&#92;sum_i x_{i}]^{2} - n[&#92;sum_i x_{i}^{2}]} $$ <br/>";
    let somaX = "";
    let somaY = "";
    let somaXiYi = "";
    let somaX2 = "";
    let somaXNumeric = 0;
    let somaYNumeric = 0;
    let somaXiYiNumeric = 0;
    let somaX2Numeric = 0;
    listaValores.forEach(element => {
        somaX += element.x +  " + ";
        somaY += element.y + " + ";
        somaXiYi += "(" + element.x + ") (" + element.y + ")" + " + ";
        somaX2 += element.x + "²" + " + ";
        somaXNumeric += (element.x * 1);
        somaYNumeric += (element.y * 1);
        somaXiYiNumeric += (element.x * element.y);
        somaX2Numeric += (element.x * element.x);
    });

    somaX = somaX.substring(0, somaX.length-2);
    somaY = somaY.substring(0, somaY.length-2);
    somaXiYi = somaXiYi.substring(0, somaXiYi.length-2);
    somaX2 = somaX2.substring(0, somaX2.length-2);
    let n = listaValores.length;
    let a = ((somaXNumeric * somaYNumeric - n*somaXiYiNumeric) / (somaXNumeric*somaXNumeric - n*somaX2Numeric));
    let b = ((somaXiYiNumeric*somaXNumeric - somaX2Numeric * somaYNumeric) / (somaXNumeric*somaXNumeric - n*somaX2Numeric));
    MMQ += "$$ a = &#92;frac{[" + somaX + "][" + somaY + "] - " + n + "[" + somaXiYi + "]}{[" + somaX + "]²" + " - " + n + "[" + somaX2 + "]} $$<br/>";
    MMQ += "$$ a = &#92;frac{[" + somaXNumeric + "][" + somaYNumeric + "] - " + n + "[" + somaXiYiNumeric + "]}{[" + somaXNumeric + "]²" + " - " + n + "[" + somaX2Numeric + "]} $$<br/>";
    MMQ += "$$ a = &#92;frac{" + (somaXNumeric * somaYNumeric - n*somaXiYiNumeric) + "}{" + (somaXNumeric*somaXNumeric - n*somaX2Numeric) + "} = " + 
    a + "$$<br/><br/>";
    MMQ += "$$ b = &#92;frac{[&#92;sum_i x_{i}y_{i}][&#92;sum_i x_{i}] - n[&#92;sum_i x_{i}^{2}][&#92;sum_i y_{i}]}{[&#92;sum_i x_{i}]^{2} - n[&#92;sum_i x_{i}^{2}]} $$ <br/>";
    MMQ+= "$$ b =  &#92;frac{[" + somaXiYi + "][" + somaX + "] - [" + somaX2 + "][" + somaY + "]}{[" + somaX + "]²" + " - " + n + "[" + somaX2 + "]} $$<br/>";
    MMQ+= "$$ b =  &#92;frac{[" + somaXiYiNumeric + "][" + somaXNumeric + "] - [" + somaX2Numeric + "][" + somaYNumeric + "]}{[" + somaXNumeric + "]²" + " - " + n + "[" + somaX2Numeric + "]} $$<br/>";
    MMQ+= "$$ b =  &#92;frac{" + (somaXiYiNumeric*somaXNumeric - somaX2Numeric * somaYNumeric) + "}{" + (somaXNumeric*somaXNumeric - n*somaX2Numeric) + "} = " +
    b + "$$<br/><br/>";

    MMQ+= "A equação da reta linearizada é: ";
    MMQ+= "$$ y = " + a + "x + " + b + "$$";
    document.querySelector("#resultadoMMQ").innerHTML = MMQ;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}