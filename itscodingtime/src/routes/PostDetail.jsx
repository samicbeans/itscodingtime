import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client.js';
import CreateComment from '../components/CreateComment.jsx';
import ReadComments from '../components/ReadComments.jsx';

    const PostDetail = () => {
        const { postId } = useParams(); // Get the id parameter from the URL
        const [post, setPost] = useState(null);
    
        useEffect(() => {
            const fetchPost = async () => {
                const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', postId)
                    .single(); // Retrieve only one post based on the id
    
                if (error) {
                    console.error('Error fetching post:', error.message);
                } else {
                    setPost(data);
                }
            };
    
            fetchPost();
        }, [postId]);
    
        const handleEditClick = () => {
          // Navigate to the EditPost page with the post's ID as a parameter
          window.location = `/editpost/${post.id}`;
      };
    
        const updateUpvotes = async (event) => {
            event.preventDefault();
            await supabase
                .from('Posts')
                .update({ upvoteCount: post.upvoteCount + 1})
                .eq('id', postId);
            window.location = `/viewpost/${post.id}`;
        };

        const deletePost = async (event) => {
            event.preventDefault();
            await supabase
                .from('Posts')
                .delete()
                .eq('id', postId);
            window.location = "/";
        };

        if (!post) {
            return <div>Post not found</div>;
        }
        return (
            <>
            <h2>{post.title}</h2>
            <div className='detail'>
                {post.description ?  <p>Description: {post.description}</p> : <p> Description: None</p>}
                <p>Post ID: {post.id}</p>
                <p>By {post.author}</p>
                <p>Created At: {post.created_at}</p>
                <button onClick={updateUpvotes}>Upvotes: {post.upvoteCount}</button>
                <Link to={`/editpost/${postId}`} ><button className='editButton' onClick={handleEditClick}>Edit Post</button></Link>
                <button className="deleteButton" onClick={deletePost}>Delete Post</button>
            </div>
            <div className='interact-post'>
                <CreateComment postid ={post.id}/>
                <ReadComments/>
            </div>
            </>
        );
    };
    
    export default PostDetail;