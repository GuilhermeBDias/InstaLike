import { ObjectId } from "mongodb"
import conectarAoBanco from "../config/dbconfig.js"

// **Conecta ao banco de dados MongoDB usando a string de conexão fornecida**
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)


// **Busca todos os posts da coleção "posts" no banco de dados "imersão-instalike"**
export async function getTodosPosts(){
    //**Conecta ao banco de dados "imersão-instalike" e seleciona a coleção "posts"**
    const db = conexao.db("imersão-instalike")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function criarPost(novoPost){
    //**Conecta ao banco de dados "imersão-instalike" e seleciona a coleção "posts"**
    const db = conexao.db("imersão-instalike")
    const colecao = db.collection("posts")
    //**Insere um novo documento (post) na coleção "posts"**
    return colecao.insertOne(novoPost)
}

export async function attPost(id, novoPost){
    const db = conexao.db("imersão-instalike")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}