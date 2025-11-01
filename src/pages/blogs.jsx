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
    <div className="blog-page">

      {/* Intro Section */}
      <section className="blog-intro">
        <h1>Travel Blogs</h1>
        <p>Explore travel experiences shared by our community and team.</p>
        <img src="./img/tokyoo.jpg" alt="Travel Intro" className="blog-intro-img" />
      </section>

      {/* Blog Feed */}
      {loadingPosts ? (
        <div className="skeleton-grid">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ) : (
        <div className="feed">
          {posts.map((p) => (
            <article className="post-card" key={p.id}>
              <div className="post-header">
                <h3>{p.title}</h3>
                <div className="post-meta">{new Date(p.created_at).toLocaleDateString()}</div>
              </div>

              <div className="post-media">
                {p.media_type === "video" ? (
                  <video
                    src={p.media_url}
                    controls
                    className="blog-media"
                  />
                ) : (
                  <img src={p.media_url} alt={p.title} className="blog-media" />
                )}
              </div>

              <div className="post-body">
                <p>{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
