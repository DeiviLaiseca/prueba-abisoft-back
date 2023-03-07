"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_config_1 = require("../configurations/email-config");
class Email {
    enviar(mensaje) {
        return __awaiter(this, void 0, void 0, function* () {
            // Enviar mensaje por correo electronico
            yield email_config_1.transporter.sendMail(mensaje, (error, info) => {
                if (error) {
                    console.log("[EmailSend]: Ha ocurrido un error: " + error.message);
                    return error.message;
                }
                // only needed when using pooled connections
                email_config_1.transporter.close();
            });
        });
    }
    enviarT(data) {
        const mensaje = {
            from: `"${data.from}" <approplat@gmail.com>`,
            to: data.email,
            subject: "Inicio Tratamiento",
            html: `    
                <h3>Nuevo tratamiento</h3>
                <hr>
                <br>
                <p>Señor(a) ${data.nombre}, ha iniciado un nuevo tratamiento con nuestros especialistas, 
                a continuación se relaciona la información correspondiente:</p>
                <b>Tratamiento: ${data.tratamiento.toLowerCase()}</b>
                <br>
                <b>Valor tratamiento: $ ${this.currency(data.valorTratamiento)}</b>
                <br>
                <b>Inicial: $ ${this.currency(data.valorInicial)}</b>
                <br>
                <b>Valor adeudado: $ ${this.currency(data.valorRestante)}</b>
                <br>
                <b>Citas: ${data.citas}</b>
                <br>
                <br>
                <p>AVISO LEGAL : Este mensaje es confidencial, puede contener
                información privilegiada y no puede ser usado ni divulgado por
                personas distintas de su destinatario. Si obtiene esta transmisión
                por error, por favor destruya su contenido y avise a su remitente.
                esta prohibida su retención, grabación, utilización, aprovechamiento
                o divulgación con cualquier propósito.</p>`, // html body
        };
        this.enviar(mensaje);
    }
    enviarA(data) {
        const mensaje = {
            from: `"${data.from}" <approplat@gmail.com>`,
            to: data.email,
            subject: "Cita agendada",
            html: `    
                <h3>Su cita ha sido agendada</h3>
                <hr>
                <br>
                <p>Señor(a) ${data.nombre}, su cita ha sido agendada exitosamente, 
                a continuación se relaciona la información correspondiente:</p>
                <b>Fecha: ${this.formatFecha(data.fechaInicio)}</b>
                <br>
                <b>Hora Inicio: ${this.formatHora(data.fechaInicio)}</b>
                <br>
                <b>Hora Fin: ${this.formatHora(data.fechaFin)}
                <br>
                <b>Tratamiento: ${data.tratamiento.toLowerCase()}
                <br>
                <br>
                <p>AVISO LEGAL : Este mensaje es confidencial, puede contener
                información privilegiada y no puede ser usado ni divulgado por
                personas distintas de su destinatario. Si obtiene esta transmisión
                por error, por favor destruya su contenido y avise a su remitente.
                esta prohibida su retención, grabación, utilización, aprovechamiento
                o divulgación con cualquier propósito.</p>`, // html body
        };
        this.enviar(mensaje);
    }
    formatFecha(date) {
        const dia = date.getDate();
        const mes = new Intl.DateTimeFormat('es', { month: "long" }).format(date);
        return `${dia} ${mes} ${date.getFullYear()}`;
    }
    formatHora(date) {
        const hora = date.toLocaleTimeString('en-US');
        return `${hora}`;
    }
    currency(precio) {
        let currency = '';
        let valor = precio.toString();
        const tam = valor.length - 1;
        for (let i = tam, cont = 1; i >= 0; i--, cont++) {
            currency += valor.charAt(i);
            if (cont === 3 && i !== 0) {
                currency += ',';
                cont = 0;
            }
        }
        return currency.split("").reverse().join("");
    }
}
exports.default = Email;
