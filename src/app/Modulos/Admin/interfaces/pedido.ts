import { Cliente } from "./cliente";
import { DetallePedido } from "./detalle-pedido";

export interface Pedido {
  _id?: string;
  fecha: Date;
  numero?: number;
  estado: number;
  horaEstimadaFin: Date;
  tipoEnvio: number;
  cliente: Cliente;
  detalles: DetallePedido[];
}

export const EstadoPedido = [
  "En Cocina",
  "Para entrega",
  "Facturado / Entregado"
];

export const TipoRetiro = ["En Local", "A domicilio"];
