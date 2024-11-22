import fs from "fs";
import {getTodosPosts, criarPost, attPost} from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js"

//**Responsável por buscar todos os posts armazenados no banco de dados**/
export async function listarPosts(req, res){ 
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

//**Cria um novo post com base nos dados enviados**/
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

//**Cria um novo post com uma imagem**/
export async function uploadImg(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

//**Atualiza um post com uma nova descrição usando o Gemini **/
export async function attNovoPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`
    
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await attPost(id, post);
        res.status(200).json(postCriado);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};


