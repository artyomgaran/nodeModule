document.addEventListener('click', async (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        })
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const oldTitle = event.target.dataset.title;

        const newTitle = prompt(oldTitle)

        if (newTitle) {
            await edit(id, newTitle)
            location.reload()
        }
    }
})

async function remove(id) {
     await fetch(`/${id}`, {
        method: 'DELETE',
    })
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
}

