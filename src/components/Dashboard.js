import Metar from "../classes/Metar.js";
import InputClass from "./InputClass";

import { useState } from 'react';

const Dashboard = () => {
    var heading = ["Mensagem", "Visibilidade", "    Teto    ", "Cor"];
    //var manha = [5, 14] // hora inicial e final
    //var tarde = [15, 20]
    //var noite = [21, 23]


    var body = [
        ["Verde", "verde", "Amarelo"],
        ["Verde", "vermelho", "Amarelo"],
        ["Amarelo", "vermelho", "Amarelo"],
        ["verde", "Amarelo", "Verde"],
    ];

    const [data, setData] = useState("")
    const [localidade, setLocalidade] = useState("SBCF")
    const [metares, setMetares] = useState(body)

    //var color = ""


    function localidadeChanged(e) {
        console.log(e.target.value)
        setLocalidade(e.target.value)
    }

    function dataChanged(e) {
        console.log(e.target.value)
        setData(e.target.value)
    }

    function atualizarMetar() {
        console.log(`${data} - ${localidade}`)
        getMetar(data.replaceAll("-", ""), localidade)
    }

    function getMetar(data, localidade) {
        function done(mets) {
            setMetares(mets)
        }
        //const met = new Metar()
        (new Metar()).get(done, localidade, data) //a solicitação de Metar via fetch é assíncrona
    }
    function getColor(c) {
        //  if (c)
        return c?.toLowerCase()
    }

    return (
        <div>
            <div>
                <span>
                    <h5>Localidade: <InputClass Localidade={""} value={localidade} onChange={localidadeChanged} /></h5>
                </span>
                <span>
                    <h5>Data:   <InputClass Data={""} value={data} onChange={dataChanged} type={"date"} /></h5>
                </span>
                <input type={"button"} value={"Atualizar"} onClick={atualizarMetar}></input>
            </div>
            <table>
                <thead>
                    <tr>
                        {heading.map((head, i) => (
                            <td key={i}>{head}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {metares.map((row, i) => (
                        <tr className={`"${getColor(row[3])}"`} key={i}>


                            {row.map((val, j) => (
                                //           <td className={`"${getColor(row[3])}"`} key={j}>
                                <td id={`"vermelho"`} key={j}>
                                    {val}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div >
    )
}
export default Dashboard