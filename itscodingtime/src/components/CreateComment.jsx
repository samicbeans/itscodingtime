import { useState} from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client.js';

const CreateComment = () => {

    const { postId } = useParams();
    const [comment, setComment] = useState({ author: "", content: "" });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setComment(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const createComment = async (event) => {
        event.preventDefault();
        await supabase
            .from('Comments')
            .insert({
                post_id: postId,
                author: comment.author,
                content: comment.content
            })
            .select();

        window.location = "/viewpost/" + postId;
    };

    return (
        <form onSubmit={createComment} className='addcomment'>
            <h4>Add a Comment</h4>
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                value={comment.author}
                onChange={handleInputChange}
                required
            />
            <br />
            <label htmlFor="content">Enter your comment:</label>
            <input
                type="text"
                id="content"
                value={comment.content}
                onChange={handleInputChange}
                required
            />
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default CreateComment;