import { useState } from 'react';

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export default function DictionaryLookup() {
  const [word, setWord] = useState('');
  const [data, setData] = useState<any>(null);
  const [viMeaning, setViMeaning] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setError('');
    setData(null);
    setViMeaning('');
    setAudioUrl('');

    try {
      // 1️⃣ Dictionary API
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!dictRes.ok) throw new Error('Không tìm thấy từ');

      const dictData = await dictRes.json();
      const entry = dictData[0];
      setData(entry);

      // Lấy audio phát âm
      const phoneticsWithAudio = entry.phonetics?.find((p: any) => p.audio);
      if (phoneticsWithAudio?.audio) {
        setAudioUrl(phoneticsWithAudio.audio);
      }

      // 2️⃣ Dịch sang tiếng Việt (MyMemory)
      const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|vi`);
      const transData = await transRes.json();
      setViMeaning(transData.responseData?.translatedText || '');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div style={styles.card}>
      <h3>📖 Tra từ điển</h3>

      <div style={styles.searchBox}>
        <input style={styles.input} value={word} placeholder="Nhập từ tiếng Anh..." onChange={(e) => setWord(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
        <button style={styles.button} onClick={handleSearch}>
          Tra
        </button>
      </div>

      {loading && <p>⏳ Đang tra từ...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {data && (
        <div style={styles.result}>
          <h4>
            {data.word} <span style={styles.phonetic}>{data.phonetic}</span>
            {audioUrl && (
              <button style={styles.audioBtn} onClick={playAudio}>
                🔊
              </button>
            )}
          </h4>

          {viMeaning && (
            <div style={styles.viMeaning}>
              🇻🇳 <b>{viMeaning}</b>
            </div>
          )}

          {data.meanings.map((m: Meaning, idx: number) => (
            <div key={idx} style={styles.meaning}>
              <b>{m.partOfSpeech}</b>
              <ul>
                {m.definitions.map((d, i) => (
                  <li key={i}>
                    {d.definition}
                    {d.example && <div style={styles.example}>👉 {d.example}</div>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: any = {
  card: {
    maxWidth: 520,
    margin: '0 auto',
    padding: 16,
    borderRadius: 8,
    border: '1px solid #ddd',
    fontFamily: 'Arial',
  },
  searchBox: {
    display: 'flex',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  button: {
    padding: '8px 12px',
    cursor: 'pointer',
  },
  result: {
    marginTop: 12,
  },
  phonetic: {
    color: '#888',
    fontSize: 14,
    marginLeft: 6,
  },
  audioBtn: {
    marginLeft: 8,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: 18,
  },
  viMeaning: {
    background: '#f5f7fa',
    padding: 8,
    borderRadius: 6,
    margin: '8px 0',
  },
  meaning: {
    marginTop: 8,
  },
  example: {
    fontStyle: 'italic',
    color: '#555',
    marginLeft: 8,
  },
  error: {
    color: 'red',
  },
};
