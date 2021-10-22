export async function getPokemons(limit, offset) {
    const response = await fetch(`/api/getPokemons`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            data: {
                limit: limit,
                offset: offset
            }
        })
    })

    return await response.json();
}