export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    try {
      // Obtendo os cookies do documento
      const cookies = document.cookie;

      // Se não houver cookies e a rota for diferente de 'login', redirecionar para login
      if (!cookies && to.name !== 'login' && to.name !== 'index') {
        return navigateTo('/login');
      }

      // Verificando a existência do cookie de autenticação
      const authCookie = cookies
        .split('; ')
        .find((row) => row.startsWith('auth='));

      // Se não houver cookie de autenticação e a rota não for 'login' ou 'index', redirecionar para login
      if (!authCookie && to.name !== 'login' && to.name !== 'index') {
        return navigateTo('/login');
      }

      // Se houver cookie de autenticação e a rota for 'login', redirecionar para a página inicial
      if (authCookie && to.name === 'login') {
        return navigateTo('/translateVideo');
      }
    } catch (e) {
      // Se ocorrer um erro, redirecionar para login
      return navigateTo('/login');
    }
  }
});
