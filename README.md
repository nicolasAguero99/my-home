# ✅ BACKEND TODOs – MVP REAL
> Enfocado en funcionalidad del producto

---

## 🔐 AUTENTICACIÓN

- [ ] Implementar registro de usuario
- [ ] Implementar login
- [ ] Hashear password con bcrypt
- [ ] Generar JWT con payload mínimo (id, email)
- [ ] Crear guard JWT
- [ ] Implementar endpoint `/me`
- [ ] Proteger todos los endpoints privados
- [ ] Validar que nunca se use `userId` desde body

---

## 👤 USER

- [ ] Modelo User definitivo (campos necesarios para MVP)
- [ ] Endpoint para obtener perfil
- [ ] Endpoint para actualizar perfil (PATCH)
- [ ] Validar email único (unique constraint)
- [ ] Manejar error P2002 correctamente

---

## 🎬 MOVIES (MVP funcional completo)

- [ ] Crear movie
- [ ] Crear múltiples movies (bulk create)
- [ ] Listar movies del usuario
- [ ] Paginación básica
- [ ] Ordenar por `createdAt`
- [ ] Filtrar por estado (ej: `watched` / `pending`)
- [ ] Actualizar movie (PATCH)
- [ ] Eliminar movie
- [ ] Eliminar múltiples movies
- [ ] Reordenar movies (campo `order` + transaction)

---

## 🎮 GAMES

- [ ] Crear game
- [ ] Listar games del usuario
- [ ] Actualizar game
- [ ] Eliminar game
- [ ] Implementar status (`completed` / `playing` / `wishlist`)
- [ ] Implementar orden manual

---

## 🎵 SONGS

- [ ] Crear song
- [ ] Crear múltiples songs
- [ ] Listar songs
- [ ] Eliminar song
- [ ] Actualizar song
- [ ] Implementar orden

---

## 🔗 LINKS (tipo Linktree interno)

- [ ] Crear link
- [ ] Listar links ordenados
- [ ] Actualizar link
- [ ] Eliminar link
- [ ] Reordenar links
- [ ] Toggle active/inactive
- [ ] Validar formato URL

---

## 📊 DASHBOARD / RESUMEN

- [ ] Endpoint que devuelva conteo total por categoría
- [ ] Endpoint que devuelva últimos agregados
- [ ] Endpoint resumen general del usuario

---

## 🔎 BÚSQUEDAS

- [ ] Implementar búsqueda por texto (`title contains`)
- [ ] Permitir búsqueda por categoría
- [ ] Hacer búsqueda case insensitive

---

## 🗂️ ORGANIZACIÓN INTERNA

- [ ] Agregar campo `order` en todas las entidades ordenables
- [ ] Agregar campo `createdAt`
- [ ] Agregar campo `updatedAt`
- [ ] Soft delete *(opcional MVP v2)*

---

## 🧪 CASOS BORDE IMPORTANTES

- [ ] Validar que no se puedan acceder registros de otro usuario
- [ ] Manejar P2003 correctamente
- [ ] Manejar intento de update/delete inexistente
- [ ] Validar arrays vacíos en bulk insert
- [ ] Evitar que un reorder deje huecos en el `order`

---

## 🚀 EXTRA MVP *(si sobra tiempo)*

- [ ] Favoritos dentro de cada categoría
- [ ] Tags simples
- [ ] Endpoint para limpiar toda una categoría
- [ ] Endpoint export JSON del usuario
