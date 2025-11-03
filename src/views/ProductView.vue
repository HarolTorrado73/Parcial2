<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Gestión de Productos</h2>
      <div>
        <button class="btn btn-success me-2" @click="openCreate">Nuevo producto</button>
        <button class="btn btn-secondary" @click="loadProducts">Refrescar</button>
      </div>
    </div>

    <div v-if="alert.message" :class="`alert alert-${alert.type}`" role="alert">
      {{ alert.message }}
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Talla</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>{{ p.price }}</td>
            <td>{{ p.size || '-' }}</td>
            <td>{{ p.color || '-' }}</td>
            <td>
              <button class="btn btn-sm btn-info text-white me-2" @click="openDetails(p)">Ver</button>
              <button class="btn btn-sm btn-primary me-2" @click="openEdit(p)">Editar</button>
              <button class="btn btn-sm btn-danger" @click="confirmDelete(p.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  <!-- Formulario create / edit -->
    <div v-if="showForm" class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">{{ editing ? 'Editar producto' : 'Crear producto' }}</h5>
        <form @submit.prevent="saveProduct">
          <div class="mb-3">
            <label class="form-label">Título</label>
            <input class="form-control" v-model="form.title" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Precio</label>
            <input type="number" class="form-control" v-model.number="form.price" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Talla</label>
            <input class="form-control" v-model="form.size" placeholder="S, M, L, XL" />
          </div>
          <div class="mb-3">
            <label class="form-label">Color</label>
            <input class="form-control" v-model="form.color" placeholder="Ej: rojo, azul" />
          </div>
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" v-model="form.description"></textarea>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" :disabled="saving">{{ saving ? 'Guardando...' : (editing ? 'Actualizar' : 'Crear') }}</button>
            <button type="button" class="btn btn-secondary" @click="closeForm">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal sencillo para ver detalles -->
    <div v-if="showModal" class="modal-backdrop d-flex align-items-center justify-content-center" style="position:fixed;inset:0;z-index:1050;">
      <div class="card" style="width:90%;max-width:700px;">
        <div class="card-body">
          <h5 class="card-title">Detalles del producto</h5>
          <p><strong>ID:</strong> {{ selectedProduct.id }}</p>
          <p><strong>Título:</strong> {{ selectedProduct.title }}</p>
          <p><strong>Precio:</strong> {{ selectedProduct.price }}</p>
          <p><strong>Descripción:</strong></p>
          <p>{{ selectedProduct.description }}</p>
          <div class="text-end">
            <button class="btn btn-secondary" @click="closeDetails">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productService from '../services/productService'

const products = ref([])
const loading = ref(false)
const alert = ref({ message: '', type: 'info' })

const showForm = ref(false)
const editing = ref(false)
const saving = ref(false)
const form = ref({ id: null, title: '', price: 0, description: '', size: '', color: '' })
const showModal = ref(false)
const selectedProduct = ref({})

async function loadProducts() {
  loading.value = true
  alert.value = { message: '', type: 'info' }
  try {
    products.value = await productService.listProducts()
  } catch (err) {
    console.error(err)
    alert.value = { message: 'Error al cargar productos. Revisa la consola.', type: 'danger' }
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editing.value = false
  form.value = { id: null, title: '', price: 0, description: '', size: '', color: '' }
  showForm.value = true
}

function openEdit(p) {
  editing.value = true
  form.value = { id: p.id, title: p.title, price: p.price, description: p.description || '', size: p.size || '', color: p.color || '' }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

async function saveProduct() {
  saving.value = true
  alert.value = { message: '', type: 'info' }
  try {
    if (editing.value && form.value.id) {
      await productService.updateProduct(form.value.id, {
        title: form.value.title,
        price: form.value.price,
        description: form.value.description,
        size: form.value.size,
        color: form.value.color,
      })
      alert.value = { message: 'Producto actualizado correctamente.', type: 'success' }
    } else {
      await productService.createProduct({
        title: form.value.title,
        price: form.value.price,
        description: form.value.description,
        size: form.value.size,
        color: form.value.color,
      })
      alert.value = { message: 'Producto creado correctamente (simulado).', type: 'success' }
    }
    await loadProducts()
    closeForm()
  } catch (err) {
    console.error(err)
    alert.value = { message: 'Error al guardar el producto. Revisa la consola.', type: 'danger' }
  } finally {
    saving.value = false
  }
}

async function confirmDelete(id) {
  if (!confirm('¿Eliminar este producto? Esta operación es simulada por la API (no persistente).')) return
  try {
    await productService.deleteProduct(id)
    alert.value = { message: 'Producto eliminado (respuesta de FakeStore).', type: 'success' }
    await loadProducts()
  } catch (err) {
    console.error(err)
    alert.value = { message: 'Error al eliminar el producto. Revisa la consola.', type: 'danger' }
  }
}

function openDetails(p) {
  selectedProduct.value = p
  showModal.value = true
}

function closeDetails() {
  showModal.value = false
  selectedProduct.value = {}
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.table td, .table th { vertical-align: middle }
</style>

