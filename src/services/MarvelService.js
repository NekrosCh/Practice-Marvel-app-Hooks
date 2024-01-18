import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1f1fa2b0e4ee129e64fed67b9fd8be00';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };
    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };
    const getComics= async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.lenght > 209 ? `${char.description.slice(0, 210)}...` : char.description}` : 'Sorry, this characters story is lost in the depths of the Galaxy.',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    };
    
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price ? `${comics.prices[0].price}$`: 'NOT AVAILABLE',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description ? comics.description : 'Sorry, description this comics is lost in the depths of the Galaxy.',
            pageCount: comics.pageCount + 'pages',
            language: comics.textObjects[0]?.language || 'en-us'
        };
    };

    return {
        loading, 
        error, 
        getAllCharacters, 
        getCharacter, 
        clearError, 
        getAllComics, 
        getComics}

}

export default useMarvelService;