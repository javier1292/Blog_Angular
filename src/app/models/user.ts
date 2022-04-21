export class User{
    constructor(
        public id: number,
        public Nombre: string,
        public Apellido: string,
        public Role: string,
        public Email: string,
        public Password: string,
        public Descripcion: string,
        public Imagen: string
    ){}
}