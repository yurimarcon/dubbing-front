import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter();

  if (process.client) {
    try {
      const cookies = document.cookie;

      if (!cookies) {
        if (to.name !== 'login') {
          return router.push('/login');
        }
      } else {
        const authCookie = cookies
          .split('; ')
          .find((row) => row.startsWith('auth='));

        if (!authCookie && to.name !== 'login') {
          return router.push('/login');
        }

        if (authCookie && to.name === 'login') {
          return router.push('/');
        }
      }
    } catch (e) {
      return router.push('/login'); 
    }
  }
});
