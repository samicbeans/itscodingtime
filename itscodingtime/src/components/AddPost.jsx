import { useState } from 'react';
import { supabase } from '../client.js';

const AddPost = () => {
    const [post, setPost] = useState({ author: "", title: "", description: "" });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setPost(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const makePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert({
                author: post.author,
                title: post.title,
                description: post.description
            })
            .select();

        window.location = "/";
    };

    return (
        <form onSubmit={makePost}>
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                value={post.author}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={post.title}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor="description">Description (optional):</label>
            <input
                type="text"
                id="description"
                value={post.description}
                onChange={handleInputChange}
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddPost;