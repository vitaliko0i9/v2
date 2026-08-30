import lyricsgenius
from dotenv import load_dotenv

load_dotenv()

GENIUS_ACCESS_TOKEN = os.environ["GENIUS_ACCESS_TOKEN"]
genius = lyricsgenius.Genius(GENIUS_ACCESS_TOKEN)

song = genius.search_song("on BS", "Drake")
if song:
    print(song.lyrics)