const form = document.getElementById('task-form');
const input = document.getElementById('task-title');
const list = document.getElementById('task-list');
const errorEl = document.getElementById('error');

function renderTask(task) {
	const li = document.createElement('li');
	li.textContent = task.title;
	list.appendChild(li);
}

async function loadTasks() {
	try {
		const res = await fetch('/tasks');
		if (!res.ok) throw new Error('Failed to load tasks.');
		list.replaceChildren();
		(await res.json()).forEach(renderTask);
	} catch (err) {
		errorEl.textContent = err.message;
	}
}

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	errorEl.textContent = '';
	try {
		const res = await fetch('/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: input.value }),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.error || 'Failed to add task.');
		renderTask(data);
		input.value = '';
		input.focus();
	} catch (err) {
		errorEl.textContent = err.message;
	}
});

loadTasks();
