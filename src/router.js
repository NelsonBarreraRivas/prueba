const LOCAL_ROUTES = {};

// Navegar a una ruta específica y actualizar el historial
export const navigateTo = (pathname, updateHistory = true) => {
  const newPath = path.replace("/prueba/", "");
// Si no se encuentra la ruta, redirigir a la página de inicio
  const path = LOCAL_ROUTES[newPath] && typeof LOCAL_ROUTES[newPath] !== 'function' ? newPath : '/';

  // Actualizar el historial
  if (updateHistory) {
    window.history.pushState({}, path, window.location.origin + newPath);
  }

  // Borra la sección raíz y renderiza el nuevo componente
  const rootSection = document.getElementById('root');
  rootSection.innerHTML = '';
  rootSection.append(LOCAL_ROUTES[newPath]());
};

// Inicializar el enrutador con las rutas
export const initRouter = (routes) => {
  // Agregar rutas a LOCAL_ROUTES
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, LOCAL_ROUTES);

  // Agregue un detector de eventos para controlar el botón de avance/retroceso
  // eslint-disable-next-line no-unused-vars
  window.addEventListener('popstate', (e) => {
    navigateTo(window.location.pathname, false);
  });

  // Agregue un detector de eventos para manejar la carga de la página
  window.addEventListener('load', () => {
    navigateTo(window.location.pathname, false);
  });
};
