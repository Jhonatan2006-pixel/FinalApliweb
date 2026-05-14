import app from "./src/app";
import { connectDB } from "./src/infrastructure/database/sequelize";
import { registerModels } from "./src/infrastructure/models";

const PORT = 3000;

async function startServer() {
  try {
    registerModels();
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor TaskFlow escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();
