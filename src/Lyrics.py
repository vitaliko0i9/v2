import lyricsgenius
genius = lyricsgenius.Genius("QSvSobkbWxo5cMEjs2kTLH2dwrMRMkiu92631cxoaYoA-D3gGrhsqqF8m3fUXLTZ")

request = genius.referents(song_id=235729,
                           per_page=50)
verified = [y for x in request['referents']
            for y in x['annotations'] if y['verified']]

print(verified)