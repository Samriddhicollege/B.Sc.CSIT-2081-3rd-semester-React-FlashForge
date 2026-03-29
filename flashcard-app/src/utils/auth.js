// Simple localStorage-based auth (no backend)

export const getUsers = () => {
  try { return JSON.parse(localStorage.getItem("ff_users") || "[]") } catch { return [] }
}

export const saveUsers = (users) => {
  localStorage.setItem("ff_users", JSON.stringify(users))
}

export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem("ff_current_user") || "null") } catch { return null }
}

export const setCurrentUser = (user) => {
  localStorage.setItem("ff_current_user", JSON.stringify(user))
}

export const clearCurrentUser = () => {
  localStorage.removeItem("ff_current_user")
}

export const hashPassword = (pw) => btoa(pw + "ff_salt_2025")

export const register = (name, email, password) => {
  const users = getUsers()
  if (users.find(u => u.email === email)) return { error: "Email already registered." }
  const user = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name, email,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
    avatar: name.charAt(0).toUpperCase(),
  }
  saveUsers([...users, user])
  return { user }
}

export const login = (email, password) => {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === hashPassword(password))
  if (!user) return { error: "Invalid email or password." }
  return { user }
}

export const getUserData = (userId, key, fallback) => {
  try { return JSON.parse(localStorage.getItem(`ff_${userId}_${key}`) || JSON.stringify(fallback)) }
  catch { return fallback }
}

export const setUserData = (userId, key, data) => {
  localStorage.setItem(`ff_${userId}_${key}`, JSON.stringify(data))
}
