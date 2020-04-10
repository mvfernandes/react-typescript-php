import { SharedService } from "./SharedService";
import { BaseResponse } from "./types";
import { UsuarioDTO } from "Models/UsuarioDTO";

export class PerfilService {
    private service = new SharedService();

    public getPerfil() {
        return this.service.getJson<BaseResponse<UsuarioDTO>>('/perfil');
    }

    public updatePerfil(cliente: UsuarioDTO) {
        return this.service.putJson<unknown, BaseResponse<unknown>>('/perfil', cliente);
    }

}