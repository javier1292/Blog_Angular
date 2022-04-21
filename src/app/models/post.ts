export class Post{
   
        constructor(
            public id: number,
            public user_id: string,
            public categoria_id: string,
            public titulo: string,
            public content: string,
            public imagen: string,
            public created_at: any
        ){}
    
}