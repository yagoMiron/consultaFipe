import express from 'express';
import cors from 'cors'

const app = express();

// CORS COMPLETAMENTE LIBERADO
app.use(
  cors({
    origin: true, // Permite TODAS as origens
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
// Middleware para requisições OPTIONS (preflight)
app.options("*", cors());

app.use(express.json());
// Rota para a URL base retornar o health
app.get("/", (req, res) => {
  res.json({
    message: "API cotação sem placa funcionando!",
    status: "OK",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
    },
  });
});


// Iniciar servidor (APENAS UMA VEZ)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API cotação rodando na porta: ${PORT}`);
});

