export default function ({ route, redirect }) {
    const query = { ...route.query };
    
    // Se o parâmetro __clerk_handshake existir, vamos removê-lo
    if (query.__clerk_handshake) {
      delete query.__clerk_handshake;
      return redirect({ path: route.path, query });
    }
  }