const API_BASE = 'https://fakestoreapi.com/products'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${text}`)
  }
  // DummyJSON returns JSON for most endpoints
  return res.json()
}

export async function listProducts() {
  // FakeStore returns an array of products
  return request(API_BASE)
}

export async function getProduct(id) {
  return request(`${API_BASE}/${id}`)
}

export async function createProduct(product) {
  const body = JSON.stringify(product)
  return request(API_BASE, { method: 'POST', body })
}

export async function updateProduct(id, product) {
  const body = JSON.stringify(product)
  return request(`${API_BASE}/${id}`, { method: 'PUT', body })
}

export async function deleteProduct(id) {
  return request(`${API_BASE}/${id}`, { method: 'DELETE' })
}

export default { listProducts, getProduct, createProduct, updateProduct, deleteProduct }
