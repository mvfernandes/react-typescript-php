export interface UsuarioDTO {
    id?: string
    email: string
    updated_at?: Date | string
    created_at?: Date | string
    nivel?: string
    empresa: string
    nome: string
    password?: string
    newpassword?: string;
}