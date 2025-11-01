import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 
import "../styles/blogs.css";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("travel_blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPosts(data || []);
    setLoadingPosts(false);
  }

  return (
    <>
      {/* Hero Section (outside blog-page) */}
      <section className="hero">
        <img src="./img/tokyoo.jpg" alt="Travel Hero" className="no-button-img" />
        <div className="hero-text">
          <h1>Travel Blogs</h1>
          <p>Explore travel experiences shared by our community and team.</p>
        </div>
      </section>

      {/* Blog Feed */}
      <div className="blog-page">
        <section className="fb-feed">
          {loadingPosts ? (
            <div className="skeleton-grid">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          ) : posts.length === 0 ? (
            <p>No blogs available.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="fb-post-card">
                {/* Post Header */}
                <div className="fb-post-header">
                  <h3>{post.title}</h3>
                  <span className="fb-post-date">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Post Media */}
                <div className="fb-post-media">
                  {post.media_type === "video" ? (
                    <video
                      src={post.media_url}
                      controls
                      className="blog-media"
                    />
                  ) : (
                    <img
                      src={post.media_url}
                      alt={post.title}
                      className="blog-media"
                    />
                  )}
                </div>

                {/* Post Body */}
                <div className="fb-post-body">
                  <p>{post.description}</p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}
