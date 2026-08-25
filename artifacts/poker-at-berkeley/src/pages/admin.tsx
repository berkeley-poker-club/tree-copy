import React, { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListEvents,
  getListEventsQueryKey,
  useCreateEvent,
  useDeleteEvent,
  useListInstagramPosts,
  getListInstagramPostsQueryKey,
  useCreateInstagramPost,
  useDeleteInstagramPost,
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { FaTrash, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useListEvents({
    query: { queryKey: getListEventsQueryKey() },
  });
  const { data: instagramPosts, isLoading: loadingPosts } = useListInstagramPosts({
    query: { queryKey: getListInstagramPostsQueryKey() },
  });

  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  const createPost = useCreateInstagramPost();
  const deletePost = useDeleteInstagramPost();

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [postUrl, setPostUrl] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postOrder, setPostOrder] = useState("0");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "pokeratberkeley") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent.mutate(
      {
        data: {
          title,
          eventDate,
          eventTime,
          location,
          description: description || null,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListEventsQueryKey() });
          setTitle("");
          setEventDate("");
          setEventTime("");
          setLocation("");
          setDescription("");
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListEventsQueryKey() });
          },
        }
      );
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate(
      {
        data: {
          shortcode: postUrl.trim(),
          caption: postCaption.trim() || null,
          displayOrder: Number(postOrder),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListInstagramPostsQueryKey() });
          setPostUrl("");
          setPostCaption("");
          setPostOrder("0");
        },
      }
    );
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Remove this post from the Instagram feed?")) {
      deletePost.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListInstagramPostsQueryKey() });
          },
        }
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020d1a] flex flex-col items-center justify-center p-4">
        <Link href="/" className="absolute top-8 left-8 text-[#94a9c0] hover:text-[#FDB515] flex items-center gap-2 transition-colors">
          <FaArrowLeft /> Back to Home
        </Link>
        <div className="w-full max-w-md bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#FDB515] text-[#001F3F] font-bold py-3 rounded-lg hover:bg-[#ffc53d] transition-colors shadow-[0_0_20px_rgba(253,181,21,0.2)]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020d1a] text-white p-4 pb-20 md:p-8">
      <Link href="/" className="inline-flex items-center gap-2 text-[#94a9c0] hover:text-[#FDB515] mb-8 transition-colors">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-extrabold mb-8">Manage Events</h1>
          
          <div className="bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-[#FDB515] mb-6">Create New Event</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Event Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Time (e.g. 7:00 PM – Midnight)</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    required
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-[#94a9c0] font-medium">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={createEvent.isPending}
                className="bg-[#FDB515] text-[#001F3F] font-bold px-6 py-3 rounded-lg hover:bg-[#ffc53d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createEvent.isPending ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">All Events</h2>
          {isLoading ? (
            <div className="text-[#94a9c0]">Loading events...</div>
          ) : !events || events.length === 0 ? (
            <div className="bg-[#0D1B2E]/50 border border-[#1e3a5f] rounded-xl p-8 text-center text-[#94a9c0]">
              No events found.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    <p className="text-sm text-[#94a9c0]">
                      {new Date(event.eventDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} &middot; {event.eventTime} &middot; {event.location}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deleteEvent.isPending}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors w-fit border border-red-500/20 disabled:opacity-50"
                  >
                    <FaTrash className="w-3 h-3" />
                    <span className="text-sm font-semibold">Delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instagram Feed Management */}
        <div>
          <h1 className="text-3xl font-extrabold mb-8">Manage Instagram Feed</h1>

          <div className="bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-6 md:p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-[#FDB515] mb-2">Add a Post</h2>
            <p className="text-sm text-[#7fa8c9] mb-6">
              Paste the full Instagram URL (e.g. instagram.com/p/ABC123/) or just the shortcode.
            </p>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-[#94a9c0] font-medium">Instagram Post URL or Shortcode</label>
                <input
                  type="text"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  required
                  placeholder="https://www.instagram.com/p/ABC123/ or ABC123"
                  className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white placeholder:text-[#3a5a7a] focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Caption (optional, for your reference)</label>
                  <input
                    type="text"
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    placeholder="e.g. Game Night Recap"
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white placeholder:text-[#3a5a7a] focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-[#94a9c0] font-medium">Display Order (lower = first)</label>
                  <input
                    type="number"
                    value={postOrder}
                    onChange={(e) => setPostOrder(e.target.value)}
                    className="w-full bg-[#020d1a] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FDB515]/50 transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={createPost.isPending}
                className="bg-[#FDB515] text-[#001F3F] font-bold px-6 py-3 rounded-lg hover:bg-[#ffc53d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createPost.isPending ? "Adding..." : "Add Post"}
              </button>
            </form>
          </div>

          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          {loadingPosts ? (
            <div className="text-[#94a9c0]">Loading posts...</div>
          ) : !instagramPosts || instagramPosts.length === 0 ? (
            <div className="bg-[#0D1B2E]/50 border border-[#1e3a5f] rounded-xl p-8 text-center text-[#94a9c0]">
              No posts added yet. Add one above.
            </div>
          ) : (
            <div className="space-y-3">
              {instagramPosts.map((post) => (
                <div key={post.id} className="bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white/80">{post.shortcode}</span>
                      <a
                        href={`https://www.instagram.com/p/${post.shortcode}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FDB515]/60 hover:text-[#FDB515] transition-colors"
                        title="Open on Instagram"
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    </div>
                    {post.caption && (
                      <span className="text-xs text-[#7fa8c9]">{post.caption}</span>
                    )}
                    <span className="text-xs text-[#3a5a7a]">Order: {post.displayOrder}</span>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletePost.isPending}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors w-fit border border-red-500/20 disabled:opacity-50"
                  >
                    <FaTrash className="w-3 h-3" />
                    <span className="text-sm font-semibold">Remove</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
