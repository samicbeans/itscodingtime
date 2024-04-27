/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from './client.js';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('created_at'); // Default sorting by created time
    const [ascending, setAscending] = useState(true); // Default ascending order
    const [searchQuery, setSearchQuery] = useState(''); // Search query

    useEffect(() => {
        // Function to fetch posts based on sorting preference
        const fetchPosts = async () => {
            let query = supabase.from('Posts').select().order(sortBy, { ascending });

            // Apply search filter if search query is not empty
            if (searchQuery.trim() !== '') {
                query = query.ilike('title', `%${searchQuery}%`);
            }

            const { data } = await query;

            // Set state of posts
            setPosts(data);
        };

        fetchPosts();
    }, [sortBy, ascending, searchQuery]); // Update when sorting preference or search query changes

    // Function to handle sorting change
    const handleSortChange = (event) => {
        const selectedSortBy = event.target.value;
        setSortBy(selectedSortBy);
    };

    // Function to toggle ascending/descending order
    const toggleOrder = () => {
        setAscending((prevAscending) => !prevAscending);
    };

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    return (
        <div className="ReadPosts">
            <div className='sort'>
                <label htmlFor="search">Search By Title: </label>
                <input type="text" id="search" value={searchQuery} onChange={handleSearchChange} />
                <label htmlFor="sort">        Sort By: </label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Created Time</option>
                    <option value="upvoteCount">Upvotes</option>
                </select>
                <button onClick={toggleOrder}>
                    {ascending ? "▲ Ascending" : "▼ Descending"} {/* Display arrow based on order */}
                </button>
            </div>

            {posts && posts.length > 0 ? posts.map((post) => (
                <Link key={post.id} to={`/viewpost/${post.id}`}>
                    <div className="post-card">
                        <p>Title: {post.title} </p>
                        <p>Created At: {post.created_at}</p>
                        <p>Upvotes: {post.upvoteCount}</p>
                    </div>
                </Link>
            )) : <h2>No Posts Yet 😞</h2>}
        </div>
    );
};

export default ReadPosts;