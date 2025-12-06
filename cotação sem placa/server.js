import express from "express";
import cors from "cors";
import getMarcas from "./services/getMarcas.js";
import getModelos from "./services/getModelos.js";
import getAnos from "./services/getAnos.js";
import getFipe from "./services/getFipe.js";

const app = express();
app.use(express.json());

// Configuração CORS ampla
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Rota health
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API FIPE funcionando",
    version: "1.0.0",
    endpoints: {
      marcas: "/sem-placa/marcas/:tipo",
      modelos: "/sem-placa/modelos/:tipo/:marca",
      anos: "/sem-placa/anos/:tipo/:marca/:modelo",
      detalhes: "/sem-placa/detalhes/:tipo/:marca/:modelo/:ano",
    },
  });
});

//Utilidades -/-/-/-/-/-/
const retornaTipoPorNumero = (codigo) => {
  switch (codigo) {
    case "1":
      return "motorcycles";
    case "2":
      return "cars";
    case "3":
      return "trucks";
    default:
      return "invalido";
  }
};

// ---------------------------
// CONSULTA SEM PLACA
// ---------------------------

// Marcas
app.get("/sem-placa/marcas/:tipo", async (req, res) => {
  try {
    const tipo = retornaTipoPorNumero(req.params.tipo);
    if (tipo === "invalido") {
      return res.status(400).json({
        erro: "O tipo deve ser um numero de 1 á 3: 1 -> motos, 2 -> carros, 3 -> caminhões",
      });
    }
    getMarcas(retornaTipoPorNumero(tipo))
      .then((brands) => {
        res.json(brands);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar marcas" });
  }
});

// Modelos
app.get("/sem-placa/modelos/:tipo/:marca", async (req, res) => {
  try {
    const tipo = retornaTipoPorNumero(req.params.tipo);
    const marca = req.params.marca;
    if (tipo === "invalido") {
      return res.status(404).json({
        erro: "O tipo deve ser um numero de 1 á 3: 1 -> motos, 2 -> carros, 3 -> caminhões",
      });
    }

    getModelos(tipo, marca)
      .then((models) => {
        res.json(models);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar modelos" });
  }
});

// Anos
app.get("/sem-placa/anos/:tipo/:marca/:modelo", async (req, res) => {
  try {
    const tipo = retornaTipoPorNumero(req.params.tipo);
    const { marca, modelo } = req.params;
    if (tipo === "invalido") {
      return res.status(404).json({
        erro: "O tipo deve ser um numero de 1 á 3: 1 -> motos, 2 -> carros, 3 -> caminhões",
      });
    }

    getAnos(tipo, marca, modelo)
      .then((years) => {
        res.json(years);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar anos" });
  }
});

// Resultado final
app.get("/sem-placa/detalhes/:tipo/:marca/:modelo/:ano", async (req, res) => {
  try {
    const tipo = retornaTipoPorNumero(req.params.tipo);
    const { marca, modelo, ano } = req.params;
    if (tipo === "invalido") {
      return res.status(404).json({
        erro: "O tipo deve ser um numero de 1 á 3: 1 -> motos, 2 -> carros, 3 -> caminhões",
      });
    }
    getFipe(tipo, marca, modelo, ano)
      .then((detail) => {
        res.json(detail);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar veículo" });
  }
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API FIPE rodando na porta ${PORT}`));
