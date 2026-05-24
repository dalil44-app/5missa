'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const { data, error } = await supabase.from('stories').select('*');
        if (error) throw error;
        setStories(data || []);
      } catch (error) {
        console.error('Error loading stories:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>موقع خْمِيسَة ✨</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>مرحباً بك في مشروع خميسة الجديد</p>
      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #ccc' }} />
      {loading ? (
        <p style={{ textAlign: 'center' }}>جاري تحميل القصص...</p>
      ) : stories.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>لا توجد قصص متوفرة حالياً في قاعدة البيانات.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {stories.map((story) => (
            <div key={story.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#0070f3' }}>{story.title}</h2>
              <p style={{ lineHeight: '1.6', color: '#444' }}>{story.content}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
