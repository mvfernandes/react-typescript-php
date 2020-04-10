import { SharedService } from "./SharedService";

export default class MenuService {

    private service = new SharedService();

    public getMenus = () => {
        return this.service.getJson('/menu');
    }

    public logout = () => {
        return this.service.getJson('/logout');
    }
}