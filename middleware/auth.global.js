import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter();

  if (process.client) {
    try {
      const cookies = document.cookie;

      // Se não houver cookies
      if (!cookies) {
        // Se já está na página de login, não faça o redirecionamento
        if (to.name !== 'login') {
          return router.push('/login');
        }
      } else {
        const authCookie = cookies
          .split('; ')
          .find((row) => row.startsWith('auth='));

        // Se o usuário não estiver autenticado e a rota não for a de login
        if (!authCookie && to.name !== 'login') {
          return router.push('/login');
        }

        // Se o usuário estiver autenticado e tentar acessar a página de login, redireciona para a home
        if (authCookie && to.name === 'login') {
          return router.push('/');
        }
      }
    } catch (e) {
      return router.push('/login'); // Redireciona para a página de login em caso de erro
    }
  }
});
