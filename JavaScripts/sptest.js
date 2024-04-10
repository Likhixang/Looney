const body = $response.body;

try {
    const data = JSON.parse(body);
    const currentlyPlaying = data.item;
    
    if (currentlyPlaying) {
        const trackId = currentlyPlaying.id;
        const trackInfoUrl = `https://api.spotify.com/v1/tracks/${trackId}`;
        
        // 获取用户ID
        const userId = data.context_uri.split(":")[2];
        
        // 获取歌曲ISRC
        $httpClient.get(trackInfoUrl, function(error, response, data) {
            if (!error && response.status === 200) {
                const trackData = JSON.parse(data);
                const isrc = trackData.external_ids.isrc;
                
                // 构建请求链接
                const lyricsUrl = `http://e.wxriw.cn:22608/lyrics/get/mobile/new?username=${userId}&id=${trackId}&isrc=${isrc}`;
                
                // 发送请求获取歌词内容
                $httpClient.get(lyricsUrl, function(error, response, body) {
                    if (!error && response.status === 200) {
                        // 转换歌词格式
                        const lyricsData = JSON.parse(body);
                        const lyricsText = lyricsData.text;
                        const lines = lyricsText.split("\n");
                        let spotifyLyrics = "";

                        lines.forEach(line => {
                            const lyricsLine = line.replace(/^\[[^\]]*\]\s*/, "");
                            spotifyLyrics += lyricsLine + "\n";
                        });

                        // 返回转换后的歌词内容
                        $done({body: spotifyLyrics});
                    } else {
                        console.log("Error retrieving lyrics: " + error);
                        $done({});
                    }
                });
            } else {
                console.log("Error retrieving track info: " + error);
                $done({});
            }
        });
    } else {
        $done({});
    }
} catch (error) {
    console.log("Error parsing response: " + error.message);
    $done({});
}
