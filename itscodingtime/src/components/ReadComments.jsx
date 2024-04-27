import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client.js';

    const ReadComments = () => {
        const { postId } = useParams(); // Get the id parameter from the URL
        const [comments, setComments] = useState(null);
      
        useEffect(() => {
            const fetchComments = async () => {
                const { data, error } = await supabase
                    .from('Comments')
                    .select()
                    .eq('post_id', postId) //get all comments where their postid matches the url for current post
    
                if (error) {
                    console.error('Error fetching comments:', error.message);
                } else {
                    setComments(data);
                }
            };
    
            fetchComments();
        }, [postId]);
    
    
        return (
            <div className='comment-section'>
                <h3>Comments</h3>
            {comments && comments.length > 0 ? comments.map((com) => (
                <div key={com.id} className='single-comment'>
                        <div className="post-card">
                            <p>{com.content}</p>
                            <p>From {com.author} </p>
                            <p>Created At: {com.created_at}</p>
                        </div>
                </div>
            )) : <h2>No comments yet!</h2>}
            </div>
        );
    };
    
    export default ReadComments;