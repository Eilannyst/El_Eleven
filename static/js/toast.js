// main/static/js/toast.js

function showToast(title, message, type = 'normal', duration = 3000) {
    const toastComponent = document.getElementById('toast-component');
    const toastIcon = document.getElementById('toast-icon'); // Added for icon
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toastComponent) return;

    // Reset classes and styles
    toastComponent.classList.remove(
        'bg-red-50', 'border-red-500', 'text-red-600',
        'bg-green-50', 'border-green-500', 'text-green-600',
        'bg-orange-50', 'border-orange-500', 'text-orange-600', // For info
        'bg-white', 'border-gray-300', 'text-gray-800'
    );
    toastComponent.style.border = ''; // Clear inline border style

    // Set type styles and icon
    if (type === 'success') {
        toastComponent.classList.add('bg-green-50', 'border-green-500', 'text-green-600');
        toastComponent.style.border = '1px solid #22c55e';
        toastIcon.innerHTML = '✅'; // Success icon
    } else if (type === 'error') {
        toastComponent.classList.add('bg-red-50', 'border-red-500', 'text-red-600');
        toastComponent.style.border = '1px solid #ef4444';
        toastIcon.innerHTML = '❌'; // Error icon
    } else if (type === 'info') { // Added info type
        toastComponent.classList.add('bg-orange-50', 'border-orange-500', 'text-orange-600');
        toastComponent.style.border = '1px solid #f97316';
        toastIcon.innerHTML = 'ℹ️'; // Info icon
    } else { // Normal/default
        toastComponent.classList.add('bg-white', 'border-gray-300', 'text-gray-800');
        toastComponent.style.border = '1px solid #d1d5db';
        toastIcon.innerHTML = '💡'; // Normal icon
    }

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Show animation
    toastComponent.classList.remove('opacity-0', 'translate-y-64');
    toastComponent.classList.add('opacity-100', 'translate-y-0');

    // Hide animation after duration
    setTimeout(() => {
        toastComponent.classList.remove('opacity-100', 'translate-y-0');
        toastComponent.classList.add('opacity-0', 'translate-y-64');
    }, duration);
}