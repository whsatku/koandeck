export default class Unsplash{
	static id = 'c4f04786a1a83f70796a2121c2021f427e8807e31fb5d8b6d32846c41a9b89a7';
	static endpoint = 'https://api.unsplash.com/';
	static per_page = 21;

	static search(query, page=1){
		query = encodeURIComponent(query);
		return fetch(`${Unsplash.endpoint}photos/search?client_id=${Unsplash.id}&page=${page}&per_page=${Unsplash.per_page}&query=${query}`)
			.then((res) => res.json())
	}
}
