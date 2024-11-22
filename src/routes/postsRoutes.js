import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImg, attNovoPost} from "../controllers/postsController.js";


const corsOptions = {
    origin: "http://localhost:8000", optionsSuccessStatus: 200
}
//**Define o diretório de destino para os arquivos enviados**
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
//**Define o nome do arquivo que será salvo **/    
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    // **Rota GET para buscar todos os posts. Retorna um array de posts em formato JSON**
    app.get("/posts", listarPosts);
    // **Rota POST para criar um post**
    app.post("/posts", postarNovoPost);

    app.post("/upload", upload.single("imagem"), uploadImg);

    app.put("/upload/:id", attNovoPost);
}

export default routes;
