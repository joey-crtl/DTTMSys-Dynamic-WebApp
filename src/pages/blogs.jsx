    import React, { useState, useEffect, useRef } from "react";
    import { supabase } from "../supabaseClient"; 
    import "../styles/blogs.css";
    import { useDropzone } from "react-dropzone";
    import useAutoPause from "../hooks/useAutoPause";
    import { compressImage, compressVideo } from "../utils/compress";

    export default function Blogs() {
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

    // Upload modal state
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progressText, setProgressText] = useState("");

    const fileRef = useRef(null);

    useAutoPause("video.blog-media");

    useEffect(() => {
        fetchPosts();
        // subscribe to realtime insert (optional)
        // const subscription = supabase
        //   .from('travel_blogs')
        //   .on('INSERT', payload => fetchPosts())
        //   .subscribe();
        // return () => supabase.removeSubscription(subscription);
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

    // Dropzone
    const onDrop = async (acceptedFiles) => {
        if (!acceptedFiles || acceptedFiles.length === 0) return;
        const f = acceptedFiles[0];
        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [], "video/*": [] },
        maxFiles: 1,
    });

    // Upload handler: compress then upload to supabase storage and insert row
    async function handleUpload() {
    if (!file || !title) return alert("Please provide title and media file.");

    setUploading(true);
    setProgressText("Preparing file...");

    let uploadFile = file;

    try {
        if (file.type.startsWith("image")) {
        setProgressText("Compressing image...");
        const compressedBlob = await compressImage(file, 0.6);
        uploadFile = new File([compressedBlob], file.name, { type: file.type });
        } else if (file.type.startsWith("video")) {
        setProgressText("Compressing video...");
        const compressedBlob = await compressVideo(file, `out-${Date.now()}.webm`);
        uploadFile = new File([compressedBlob], file.name, { type: file.type });
        }
    } catch (err) {
        console.warn("Compression failed, using original file", err);
        uploadFile = file;
    }

    const ext = uploadFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const folder = file.type.startsWith("video") ? "video" : "image";
    const path = `${folder}/${fileName}`;

        setProgressText("Uploading to storage...");
        try {
        const { error: uploadError } = await supabase.storage
            .from("blogs")
            .upload(path, uploadFile, { upsert: false });

        if (uploadError) {
            console.error("Upload failed:", uploadError);
            alert("Upload failed: " + uploadError.message);
            setUploading(false);
            setProgressText("");
            return;
        }

        const { data: urlData } = supabase.storage.from("blogs").getPublicUrl(path);
        const publicUrl = urlData.publicUrl;

        // Save post in DB
        const { error: insertErr } = await supabase
            .from("travel_blogs")
            .insert({
            title,
            description,
            media_url: publicUrl,
            media_type: file.type.startsWith("video") ? "video" : "image",
            });

        if (insertErr) throw insertErr;

        // Reset modal
        setTitle("");
        setDescription("");
        setFile(null);
        setPreviewUrl("");
        setShowModal(false);
        fetchPosts();
        } catch (err) {
        console.error(err);
        alert("Upload failed: " + err.message);
        } finally {
        setUploading(false);
        setProgressText("");
        }
    }

    async function handleDelete(post) {
    if (!confirm("Delete this post?")) return;

    try {
        // derive filename with folder
        const url = post.media_url;
        const parts = url.split("/");
        const fileName = parts[parts.length - 1].split("?")[0];
        const folder = post.media_type === "video" ? "video" : "image";
        const path = `${folder}/${fileName}`;

        // delete from storage
        const { error: delErr } = await supabase.storage.from("blogs").remove([path]);
        if (delErr) console.warn("Storage delete error:", delErr);

        // delete DB row
        const { error: dbErr } = await supabase.from("travel_blogs").delete().eq("id", post.id);
        if (dbErr) console.error(dbErr);
        else fetchPosts();
    } catch (err) {
        console.error(err);
        alert("Delete failed");
    }
    }

    return (
        <div className="blog-page">
        <div className="blog-top">
            <h2>Travel Blogs</h2>

            <div>
            <button
                className="upload-toggle-btn"
                onClick={() => setShowModal(true)}
                aria-label="Open upload modal"
            >
                + Upload Post
            </button>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="modal-backdrop" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                <h3>New Travel Post</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
                </div>

                <div className="modal-body">
                <input
                    className="input"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                    <p>Drop file here ...</p>
                    ) : (
                    <p>Drag & drop an image or video, or click to select</p>
                    )}
                </div>

                {/* preview */}
                {previewUrl && (
                    <div className="preview-wrap">
                    {file?.type.startsWith("video") ? (
                        <video src={previewUrl} controls className="preview-media" />
                    ) : (
                        <img src={previewUrl} alt="preview" className="preview-media" />
                    )}
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn primary" disabled={uploading} onClick={() => handleUpload()}>
                    {uploading ? "Uploading..." : "Upload Post"}
                    </button>
                    <button className="btn" onClick={() => { setShowModal(false); setFile(null); setPreviewUrl(""); }}>
                    Cancel
                    </button>
                    <div className="progress-text">{progressText}</div>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Loader */}
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
                    <div className="post-title">
                    <h3>{p.title}</h3>
                    <div className="post-meta">{new Date(p.created_at).toLocaleString()}</div>
                    </div>

                    <div className="post-actions">
                    {/* Simple delete button (should be owner/admin-only) */}
                    <button className="delete-btn" onClick={() => handleDelete(p)}>Delete</button>
                    </div>
                </div>

                <div className="post-media">
                    {p.media_type === "video" ? (
                    <video
                        src={p.media_url}
                        controls
                        controlsList="nodownload"
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
