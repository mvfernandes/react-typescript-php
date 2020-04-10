import { SharedService } from "./SharedService";
import { BaseResponse } from "./types";
import { ClienteDTO } from "Models/ClienteDTO";

export class ClienteService {
    private service = new SharedService();

    public getClientes() {
        return this.service.getJson<BaseResponse<ClienteDTO[]>>('/clientes');
    }

    public newCliente(cliente: any) {
        return this.service.postJson<unknown, BaseResponse<[]>>('/clientes', cliente);
    }

    public updateCliente(cliente: any) {
        return this.service.putJson<unknown, BaseResponse<[]>>('/clientes/' + cliente.id, cliente);
    }

    public delCliente(id: number | string) {
        return this.service.deleTe('/clientes/' + id);
    }
}