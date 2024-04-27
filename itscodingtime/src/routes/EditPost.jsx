/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client.js';

const EditPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({id:"", author: "", title: "", description: "" });
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) {
                console.error('Post ID is undefined');
                return;
            }
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', postId)
                .single();

            if (error) {
                console.error('Error fetching post:', error.message);
            } else {
                setPost(data);
                setAuthor(data.author);
                setTitle(data.title);
                setDescription(data.description);
            }
        };

        fetchPost();
    }, [postId]);

    const handleAuthor = (event) => {
        const newAuthor = event.target.value;
        setAuthor(newAuthor);
        setPost((prevPost) => ({ ...prevPost, author: newAuthor }));
    };
    
    const handleTitle = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setPost((prevPost) => ({ ...prevPost, title: newTitle }));
    };
    
    const handleDescription = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        setPost((prevPost) => ({ ...prevPost, description: newDescription }));
    };
    // const updatePost = async (event) => {
    //     event.preventDefault();
    //     await supabase
    //         .from('Posts')
    //         .update({ author: author, title: title, description: description })
    //         .eq('id', postId);
    //     window.location.href = "/viewpost/" + postId; // Use postId from URL parameter
    // };
    
    // const deletePost = async (event) => {
    //     event.preventDefault();
    //     await supabase
    //         .from('Posts')
    //         .delete()
    //         .eq('id', postId);
    //     window.location.href = "/"; // Redirect to home page
    // };
    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({ author:post.author, title:post.title, description:post.description })
            .eq('id', postId);
        window.location = "/viewpost/" + postId;
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .delete()
            .eq('id', postId);
        window.location = "/";
    };

    useEffect(() => {
        if (!post) {
            // Redirect if crewmate is not found
            history.push("/not-found");
        }
    }, [post]);

    return (
        <div className='edit'>
            <h1>Editing Post</h1>
            {post.id && (
                <form onSubmit={updatePost}>
                    <label htmlFor="author">Author:</label> <br />
                    <input type="text" id="author" name="author" value={post.author} onChange={handleAuthor}  /><br />
                    <br />

                    <label htmlFor="title" className='edittitle'>Title:</label>
                    <input type="text" id="title" name="title" value={post.title} onChange={handleTitle}  /><br />
                    <br />

                    <label htmlFor="description">Description (optional):</label><br />
                    <input type="text" id="description" name="description" value={post.description} onChange={handleDescription} style={{ width: '40rem', height: '20rem' }} /><br />
                    <br />
                    <input type="submit" value="Submit"/>
                    <button className="deleteButton" onClick={deletePost}>Delete Post</button>
                </form>
            )}
        </div>
    );
};

export default EditPost;