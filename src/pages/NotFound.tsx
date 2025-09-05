import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-4">Oops! Page not found "Deu ruim mas calma!"</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Está página AINDA não existe. Você pode voltar para a página inicial clicando aqui.
          <br />
          Retornar para Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
