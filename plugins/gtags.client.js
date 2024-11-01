export default defineNuxtPlugin((nuxtApp) => {  
    if (process.env.NODE_ENV !== 'production') return; // Só executa em produção
  
    const { GTAGID } = useRuntimeConfig().public;
    
    function gtag() {
      window.dataLayer.push(arguments);
    }
    
    window.dataLayer = window.dataLayer || [];
    
    gtag("js", new Date());
    gtag("config", GTAGID);
    
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GTAGID}`,
          async: true,
        },
      ],
    });
  });