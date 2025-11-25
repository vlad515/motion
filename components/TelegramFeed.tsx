import React, { useEffect, useState } from 'react';

interface TelegramPost {
  id: string;
  text: string;
  image?: string;
  date: string;
  views?: string;
  link: string;
}

const TelegramFeed: React.FC = () => {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use AllOrigins as a CORS proxy to fetch the public Telegram web view
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent('https://t.me/s/motion_this')}&t=${Date.now()}`
        );
        const data = await response.json();
        
        if (!data.contents) throw new Error('No content received');

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const messageNodes = doc.querySelectorAll('.tgme_widget_message_wrap');

        const parsedPosts: TelegramPost[] = Array.from(messageNodes)
          .map((node) => {
            const linkElement = node.querySelector('.tgme_widget_message_date') as HTMLAnchorElement;
            const textElement = node.querySelector('.tgme_widget_message_text');
            const photoElement = node.querySelector('.tgme_widget_message_photo_wrap') as HTMLElement;
            const viewsElement = node.querySelector('.tgme_widget_message_views');

            // Extract Image URL from background-image style
            let image = undefined;
            if (photoElement) {
              const style = photoElement.getAttribute('style');
              const match = style?.match(/url\('?(.*?)'?\)/);
              if (match && match[1]) {
                image = match[1];
              }
            }

            // Clean text (replace <br> with newlines for display)
            let text = '';
            if (textElement) {
              text = textElement.innerHTML
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]*>/g, ''); // Strip other tags
              // Decode entities roughly
              const txt = document.createElement('textarea');
              txt.innerHTML = text;
              text = txt.value;
            }

            return {
              id: linkElement?.href || Math.random().toString(),
              link: linkElement?.href || 'https://t.me/motion_this',
              date: linkElement?.textContent || '',
              text: text.length > 200 ? text.slice(0, 200) + '...' : text,
              image,
              views: viewsElement?.textContent
            };
          })
          .filter(post => post.text || post.image) // Filter empty posts
          .slice(0, 6); // Take latest 6

        setPosts(parsedPosts);
      } catch (err) {
        console.error('Failed to fetch Telegram feed:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="feed" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-motion-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
              Live из <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Telegram</span>
            </h2>
            <p className="text-gray-400">
              Последние мысли, работы и новости канала
            </p>
          </div>
          <a 
            href="https://t.me/Motion_This" 
            target="_blank" 
            rel="noreferrer"
            className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.119.098.152.228.166.319.016.101.01.206.007.298z"/>
            </svg>
            Читать @Motion_This
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 mb-4">Не удалось загрузить ленту (возможно, VPN шалит)</p>
            <a 
              href="https://t.me/Motion_This" 
              className="text-motion-blue hover:underline"
            >
              Перейти в канал →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a 
                key={post.id}
                href={post.link}
                target="_blank" 
                rel="noreferrer"
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-motion-blue/50 transition-all duration-300 flex flex-col h-full"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden bg-gray-800">
                    <img 
                      src={post.image} 
                      alt="Telegram Post" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="bg-white/10 px-2 py-1 rounded">{post.date}</span>
                    {post.views && <span>👁 {post.views}</span>}
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                    {post.text}
                  </p>
                  <div className="text-motion-blue text-sm font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                    Читать полностью 
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TelegramFeed;
