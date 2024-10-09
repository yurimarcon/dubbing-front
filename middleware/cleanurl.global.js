export default function () {
  const route = useRoute();
  const router = useRouter();
  const query = { ...route.query };
  console.log(123)

  // Se o parâmetro __clerk_handshake existir, vamos removê-lo
  if (query.__clerk_handshake) {
    delete query.__clerk_handshake;
    router.replace({ path: route.path, query });
  }
}