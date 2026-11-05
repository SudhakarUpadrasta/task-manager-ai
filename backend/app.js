const express = require('express');
const { randomUUID } = require('node:crypto');

const app = express();
const tasks = [];

app.use(express.json());

app.get('/tasks', (req, res) => {
	res.json(tasks);
});

app.post('/tasks', (req, res) => {
	const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';

	if (!title) {
		return res.status(400).json({ error: 'A non-empty title is required.' });
	}

	const task = {
		id: randomUUID(),
		title,
		completed: false,
	};

	tasks.push(task);
	return res.status(201).json(task);
});

if (require.main === module) {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Task API listening on port ${port}`);
	});
}

module.exports = app;
