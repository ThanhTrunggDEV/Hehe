const API_BASE = 'http://127.0.0.1:8000';

async function loadUsers() {
	const statusEl = document.getElementById('status');
	const listEl = document.getElementById('userList');
	if (!statusEl || !listEl) return;

	statusEl.textContent = 'Loading…';
	listEl.innerHTML = '';

	try {
		const res = await fetch(`${API_BASE}/users`);
		const data = await res.json().catch(() => ({}));
		if (!res.ok) {
			throw new Error(data?.message || `HTTP ${res.status}`);
		}
		const users = Array.isArray(data.users) ? data.users : [];
		if (users.length === 0) {
			statusEl.textContent = 'No users yet.';
			return;
		}
		statusEl.textContent = '';
		const frag = document.createDocumentFragment();
		users.forEach(u => {
			const li = document.createElement('li');
			const username = u.username ?? '(unknown)';
			const name = u.name ?? '';
			li.textContent = name ? `${name} (@${username})` : `@${username}`;
			frag.appendChild(li);
		});
		listEl.appendChild(frag);
	} catch (err) {
		console.error(err);
		statusEl.textContent = `Failed to load users: ${err.message || err}`;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const refreshBtn = document.getElementById('btnRefresh');
	if (refreshBtn) refreshBtn.addEventListener('click', loadUsers);
	loadUsers();
});

