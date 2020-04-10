import { SharedService } from "./SharedService";
import { BaseResponse } from "./types";
import { UsuarioDTO } from "Models/UsuarioDTO";

export class UsuarioService {
    private service = new SharedService();

    public getUsers() {
        return this.service.getJson<BaseResponse<UsuarioDTO[]>>('/users');
    }

    public newUser(user: UsuarioDTO) {
        return this.service.postJson<unknown, BaseResponse<any>>('/users', user);
    }

    public updateUser(user: UsuarioDTO) {
        return this.service.putJson<unknown, BaseResponse<any>>('/users/' + user.id, user);
    }

    public delUser(id: number | string) {
        return this.service.deleTe<BaseResponse<any>>('/users/' + id);
    }
}