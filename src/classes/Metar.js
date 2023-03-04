
export default class Metar {
    parametroTeto = { vermelho: 200, amarelo: 500, verde: 1500 }
    parametoVisibilidade = { vermelho: 1000, amarelo: 5000, verde: 20000 }

    get(callBack, localidade, data) {
        let dataIni = data, dataFim = data
        let resp = []

        const chaveAPI = 'U9Q2PoK6e5uhykrMXrsrGAQssG8htAnPIqXsxmei'

        fetch(`https://api-redemet.decea.mil.br/mensagens/metar/${localidade}?api_key=${chaveAPI}&data_ini=${dataIni}00&data_fim=${dataFim}23`)
            .then((response) => {
                if (response.ok)
                    return response.json()
                //setMetares(response.data)
            })
            .then(response => {

                //console.log(this.getTeto(response.data.data[6].mens));
                response.data.data.map((mens) => (
                    // let teto = this.getTeto(mens.mens)[2]]];
                    resp = resp.concat([[mens.mens, this.getVisibilidade(mens.mens), this.getTeto(mens.mens)[2], this.getColorMetar(this.getVisibilidade(mens.mens), this.getTeto(mens.mens)[2])]])
                    //console.log(mens.mens)    

                )
                )
                callBack(resp)


            })
        //return resp.slice(0)
    }

    getColorMetar(vis, teto) {
        teto = parseInt(teto)
        if (teto===0)
            teto = 1500
        if (vis <= this.parametoVisibilidade.vermelho || teto <= this.parametroTeto.vermelho)
            return "VERMELHO"
        if (vis <= this.parametoVisibilidade.amarelo || teto <= this.parametroTeto.amarelo)
            return "AMARELO"

        return "VERDE"
    }

    getTeto(metar) {
        var resultado = [3];

        let ibkn = metar.indexOf(" BKN00");;
        let iovc = metar.indexOf(" OVC00");;
        let ivv = metar.indexOf(" VV00");;

        var bkn00 = ibkn > -1;
        var bknbbb = metar.includes(" BKN///");
        var bkn = bkn00 || bknbbb;

        var ovc00 = iovc > -1;
        var ovcbbb = metar.includes(" OVC///");
        var ovc = ovc00 || ovcbbb;

        var vv00 = ivv > -1;
        var vvbbb = metar.includes(" VV///");
        var vv = vv00 || vvbbb;

        resultado[1] = "F";
        resultado[2] = "0";
        resultado[3] = "NIL";



        var inicio = 0;
        var valorTeto = 0;

        if (bkn00) {
            inicio = metar.indexOf(" BKN00") + 6;
            valorTeto = metar.substr(inicio, 1);
            resultado[2] = valorTeto * 100;
            resultado[3] = "BKN00" + valorTeto;
        }

        if (ovc00) {
            if ((iovc < ibkn) || (ibkn === -1)) {
                inicio = metar.indexOf(" OVC00") + 6;
                valorTeto = metar.substr(inicio, 1);
                resultado[2] = valorTeto * 100;
                resultado[3] = "OVC00" + valorTeto;
            }
        }

        if (vv00) {
            inicio = metar.indexOf(" VV00") + 5;
            valorTeto = metar.substr(inicio, 1);
            resultado[2] = valorTeto * 100;
            resultado[3] = "VV00" + valorTeto;
        }

        if (bknbbb)
            resultado[3] = "BKN///";
        if (ovcbbb)
            resultado[3] = "OVC///";
        if (vvbbb)
            resultado[3] = "VV///";


        if (bkn || ovc || vv) {
            resultado[1] = "T";
        }

        return resultado;
    }

    getposVis(metar) {
        var posVis = 4;

        if (metar.includes(" COR ")) {
            posVis = posVis + 1;
        }

        if (metar.includes(" AUTO ")) {
            posVis = posVis + 1;
        }

        return posVis;
    }

    arraySize(arr) {
        return arr.length
    }

    getVisibilidade(metar) {

        var campos = [];
        var posVis;
        let visib
        if (metar.includes(" CAVOK ") || metar.includes(" 9999 ")) {
            return 10000
        }

        posVis = this.getposVis(metar);

        campos = metar.split(" ");

        if (posVis < this.arraySize(campos)) {
            visib = campos[posVis] + "";
        }
        else {
            return -1;
        }

        if (visib.length > 4) {
            if (visib.indexOf("V") > -1) { //vento variando
                posVis = posVis + 1;
                visib = campos[posVis];
                return visib;
            }
            else {
                return -1
            }
        }
        else {
            return visib
        }

    }

    getColorTeto(teto, parametro) {

    }

    getColorVisibilidade(visibilidade, parametro) {

    }

    /*getColorMetar(metar, parametroTeto, parametroVisibilidade) {

    }*/
}
