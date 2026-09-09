import lyricsgenius
genius = lyricsgenius.Genius('QSvSobkbWxo5cMEjs2kTLH2dwrMRMkiu92631cxoaYoA-D3gGrhsqqF8m3fUXLTZ') # you can also set the attribute here
genius.response_format = 'plain,html'

res = genius.annotation(10225840)

# Annotation in plain formatting
print(res['annotation']['body']['plain'])

# Annotation in html formatting
print(res['annotation']['body']['html'])