export default function ({ route, store, redirect }) {
  if (route.name !== 'auth-login' && !store.state.user.authToken) {
    return redirect('/auth/login')
  }
}
