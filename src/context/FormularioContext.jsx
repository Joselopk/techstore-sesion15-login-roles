import { createContext, useEffect, useState } from "react";
import { productos as productosIniciales } from "../data/productos";

export const FormularioContext = createContext(null);

const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: ""
};

function cargarCarritoInicial() {
  const carritoGuardado = localStorage.getItem("carrito");

  if (!carritoGuardado) {
    return [];
  }

  try {
    return JSON.parse(carritoGuardado);
  } catch (error) {
    console.error("No se pudo recuperar el carrito:", error);
    return [];
  }
}

function FormularioProvider({ children }) {
  const [formulario, setFormulario] = useState(formularioInicial);

  // Catálogo global: los productos creados desde el formulario estarán
  // disponibles en la página Productos y en todos los componentes de Interfaces.
  const [catalogo, setCatalogo] = useState(() => {
    try {
      const guardados = localStorage.getItem("techstore_catalogo");
      return guardados ? JSON.parse(guardados) : productosIniciales;
    } catch (error) {
      console.error("No se pudo recuperar el catálogo:", error);
      return productosIniciales;
    }
  });

  useEffect(() => {
    localStorage.setItem("techstore_catalogo", JSON.stringify(catalogo));
  }, [catalogo]);

  const agregarProductoCatalogo = (nuevoProducto) => {
    const productoCreado = {
      ...nuevoProducto,
      id: Date.now(),
      precio: Number(nuevoProducto.precio)
    };
    setCatalogo((actual) => [productoCreado, ...actual]);
    return productoCreado;
  };

  const eliminarProductoCatalogo = (id) => {
    setCatalogo((actual) => actual.filter((producto) => producto.id !== id));
  };

  // El carrito se recupera desde localStorage al iniciar la aplicación.
  const [carrito, setCarrito] = useState(cargarCarritoInicial);

  // Cada cambio del carrito se sincroniza automáticamente.
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1
        }
      ];
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadProductos = carrito.reduce(
    (acumulado, producto) => acumulado + producto.cantidad,
    0
  );

  const totalCarrito = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
  };

  return (
    <FormularioContext.Provider
      value={{
        formulario,
        catalogo,
        agregarProductoCatalogo,
        eliminarProductoCatalogo,
        setFormulario,
        limpiarFormulario,
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadProductos,
        totalCarrito
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}

export default FormularioProvider;
