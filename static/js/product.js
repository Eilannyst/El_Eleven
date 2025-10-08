document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const listContainer = document.getElementById('product-list');
  const modal = document.getElementById('productModal');
  const form = document.getElementById('productForm');
  const openModalBtn = document.getElementById('btn-open-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const submitProductBtn = document.getElementById('submitProductBtn');
  const refreshBtn = document.getElementById('btn-refresh');
  const filterAll = document.getElementById('filter-all');
  const filterMy = document.getElementById('filter-my');

  // Delete modal
  const deleteModal = document.getElementById('delete-modal');
  const deleteModalText = document.getElementById('delete-modal-text');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

  // Detail modal
  const detailModal = document.getElementById('detailModal');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const closeDetailFooter = document.getElementById('closeDetailFooter');
  const detailTitle = document.getElementById('detail-title');
  const detailThumbnail = document.getElementById('detailThumbnail');
  const detailName = document.getElementById('detailName');
  const detailPrice = document.getElementById('detailPrice');
  const detailDesc = document.getElementById('detailDesc');
  const detailMeta = document.getElementById('detailMeta');
  const detailExtra = document.getElementById('detailExtra');
  const detailActions = document.getElementById('detailActions');

  // hidden id field on form
  const productIdField = document.getElementById('product_id_field');

  let currentFilter = 'all';
  let editingId = null;
  let deletingId = null;

  // --- helpers: show loading empty error states ---
  function showLoading() {
    listContainer.innerHTML = `<p class="text-gray-500 text-center py-6">⏳ Loading produk...</p>`;
  }
  function showEmpty() {
    listContainer.innerHTML = `<div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <div class="w-32 h-32 mx-auto mb-4"><img src="/static/image/no-product.png" alt="No products" class="w-full h-full object-contain"></div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
      <p class="text-gray-500 mb-6">Be the first to add products to the store!</p>
    </div>`;
  }
  function showError() {
    listContainer.innerHTML = `<p class="text-red-500 text-center py-6">❌ Gagal memuat produk.</p>`;
  }

  // --- load products ---
  async function fetchProducts() {
    showLoading();
    try {
      const res = await fetch(`/get-products-json/?filter=${currentFilter}`);
      if (!res.ok) throw new Error('Network');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        showEmpty();
        return;
      }
      renderProducts(data);
    } catch (err) {
      showError();
    }
  }

  // --- render products ---
  function renderProducts(products) {
    listContainer.innerHTML = products.map(p => `
      <article class="bg-white rounded-lg border hover:shadow-lg transition overflow-hidden p-0 relative">
        <div class="product-card p-4" data-id="${p.id}">
          <div class="aspect-[16/9] overflow-hidden bg-gray-100 mb-3">
            ${p.thumbnail ? `<img src="${p.thumbnail}" alt="${p.name}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center text-gray-400">No Image</div>`}
          </div>
          <h3 class="text-lg font-semibold mb-1 px-4">${p.name}</h3>
          <p class="text-sm text-gray-600 line-clamp-2 mb-4 px-4">${p.description}</p>
          <div class="flex items-center justify-between px-4 pb-4">
            <span class="text-blue-600 font-medium">Rp ${p.price.toLocaleString()}</span>
            <div class="flex gap-2 items-center">
              ${p.user_username === CURRENT_USERNAME ? `
                <button class="btn-edit px-3 py-1 bg-yellow-500 text-white rounded text-sm" data-id="${p.id}">✏️ Edit</button>
                <button class="btn-delete px-3 py-1 bg-red-600 text-white rounded text-sm" data-id="${p.id}" data-name="${p.name}">🗑️ Delete</button>
              ` : `
                <button class="btn-detail text-sm text-blue-600" data-id="${p.id}">Detail →</button>
              `}
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // attach events
    document.querySelectorAll('.product-card').forEach(el => {
      el.addEventListener('click', (ev) => {
        if (ev.target.closest('.btn-edit') || ev.target.closest('.btn-delete')) return;
        const id = el.dataset.id;
        openDetailModal(id);
      });
    });

    document.querySelectorAll('.btn-detail').forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        openDetailModal(b.dataset.id);
      });
    });

    document.querySelectorAll('.btn-edit').forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        openEditModal(b.dataset.id);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        openDeleteModal(b.dataset.id, b.dataset.name);
      });
    });
  }

  // --- open detail modal ---
  async function openDetailModal(id) {
    try {
      detailActions.innerHTML = '';
      detailTitle.textContent = 'Product Detail';
      detailName.textContent = 'Loading...';
      detailPrice.textContent = '';
      detailDesc.textContent = '';
      detailMeta.textContent = '';
      detailThumbnail.src = '';
      detailExtra.textContent = '';
      detailModal.classList.remove('hidden');

      const res = await fetch(`/get-product-json/${id}/`); 
      if (!res.ok) throw new Error('not found');
      const data = await res.json();

      detailName.textContent = data.name;
      detailPrice.textContent = `Rp ${Number(data.price).toLocaleString()}`;
      detailDesc.textContent = data.description || '-';
      detailMeta.textContent = `By: ${data.user_username} • ${new Date(data.created_at).toLocaleString()}`;
      detailExtra.textContent = `Kategori: ${data.category} ${data.is_featured ? ' • Featured' : ''}`;
      detailThumbnail.src = data.thumbnail && data.thumbnail.trim() !== '' ? data.thumbnail : '/static/image/no-product.png';

      if (String(data.user_username) === String(CURRENT_USERNAME)) {
        detailActions.innerHTML = `
          <button id="detail-edit-btn" class="px-3 py-1 bg-yellow-500 text-white rounded">✏️ Edit</button>
          <button id="detail-delete-btn" class="px-3 py-1 bg-red-600 text-white rounded">🗑️ Delete</button>
        `;
        document.getElementById('detail-edit-btn').addEventListener('click', () => {
          closeDetailModal();
          openEditModal(data.id);
        });
        document.getElementById('detail-delete-btn').addEventListener('click', () => {
          closeDetailModal();
          openDeleteModal(data.id, data.name);
        });
      }
    } catch (err) {
      showToast('Error', 'Gagal memuat detail produk', 'error');
    }
  }

  function closeDetailModal() {
    detailModal.classList.add('hidden');
  }

  // --- open edit modal ---
  async function openEditModal(id) {
    editingId = id;
    try {
      const res = await fetch(`/get-product-json/${id}/`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      productIdField.value = data.id;
      form.name.value = data.name || '';
      form.price.value = data.price || '';
      form.description.value = data.description || '';
      form.category.value = data.category || '';
      form.thumbnail.value = data.thumbnail || '';
      form.is_featured.checked = !!data.is_featured;
      openCreateEditModal('Edit Produk');
    } catch (err) {
      showToast('Error', 'Gagal memuat data edit', 'error');
    }
  }

  function openCreateEditModal(title = 'Tambah Produk') {
    modal.querySelector('h2').textContent = title;
    modal.classList.remove('hidden');
  }

  function closeCreateEditModal() {
    modal.classList.add('hidden');
    editingId = null;
    productIdField.value = '';
    form.reset();
  }

  // --- create / update submit handler ---
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    submitProductBtn.disabled = true;
    submitProductBtn.textContent = '🔄 Menyimpan...';

    const formData = new FormData(form);
    const url = editingId ? `/edit-product-ajax/${editingId}/` : '/create-product-ajax/';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value },
        body: formData
      });
      const result = await res.json();
      if (result.status === 'success') {
        showToast(editingId ? 'Produk diperbarui' : 'Produk ditambahkan', result.message, 'success');
        closeCreateEditModal();
        fetchProducts();
      } else {
        const errMsg = result.errors ? JSON.stringify(result.errors) : result.message || 'Gagal';
        showToast('Gagal', errMsg, 'error');
      }
    } catch (err) {
      showToast('Error', 'Terjadi kesalahan jaringan', 'error');
    } finally {
      submitProductBtn.disabled = false;
      submitProductBtn.textContent = 'Simpan';
    }
  });

  // --- delete flow ---
  function openDeleteModal(id, name) {
    deletingId = id;
    deleteModalText.textContent = `Apakah Anda yakin ingin menghapus produk "${name}"?`;
    deleteModal.classList.remove('hidden');
  }
  function closeDeleteModal() {
    deleteModal.classList.add('hidden');
    deletingId = null;
  }
  async function performDelete() {
    try {
      const res = await fetch(`/delete-product-ajax/${deletingId}/`, {
        method: 'POST',
        headers: {'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value}
      });
      const json = await res.json();
      if (json.status === 'success') {
        showToast('Produk dihapus', json.message, 'success');
        closeDeleteModal();
        fetchProducts();
      } else {
        showToast('Gagal', json.message || 'Tidak bisa menghapus', 'error');
      }
    } catch {
      showToast('Error', 'Kesalahan jaringan', 'error');
    }
  }

  // --- events wiring ---
  if (openModalBtn) openModalBtn.addEventListener('click', () => openCreateEditModal('Tambah Produk Baru'));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCreateEditModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeCreateEditModal);
  if (refreshBtn) refreshBtn.addEventListener('click', fetchProducts);
  if (filterAll) filterAll.addEventListener('click', () => { currentFilter = 'all'; fetchProducts(); });
  if (filterMy) filterMy.addEventListener('click', () => { currentFilter = 'my'; fetchProducts(); });

  if (closeDetailBtn) closeDetailBtn.addEventListener('click', closeDetailModal);
  if (closeDetailFooter) closeDetailFooter.addEventListener('click', closeDetailModal);

  if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', performDelete);

  // initial load
  fetchProducts();
});
