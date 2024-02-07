const {
    cmd,
    isPublic
} = require("../lib/plugins.js");

cmd(
    {
        name: "find",
        fromMe: isPublic,
        category: "tools",
        desc: "Finds music from replied Audio",
        category: "misc",
    },
    async ({
        m, client
    }) => {
        try {
            if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage)) {
                return m.reply("_Reply to Audio/Video Message !_");
            }
            let buff = await m.quoted.download()
            let result = await acr.identify(buff);
            let {
                title,
                artists,
                album,
                genres,
                release_date,
                duration_ms,
                external_metadata
            } = result.metadata.music[0]
            return await m.reply(`_Title : ${title}_\n${album.name ? `_Album : ${album.name}_\n`: ''}${artists[0]?.name ? `_Artists : ${artists[0]?.name.split('/').join(', ')}_\n`: ''}${genres ? `_Genre : ${genres?.map(genre => genre?.name).join(', ')}_\n`: ''}${duration_ms ? `_Duration : ${duration_ms / 1000 + 's'}_\n`: ''}${release_date ? `_Release Date : ${release_date}_\n`: ''}${external_metadata.spotify ? `_Spotify : https://open.spotify.com/track/${external_metadata.spotify?.track.id}_\n`: ''}${external_metadata.youtube ? `_Youtube : https://youtu.be/${external_metadata.youtube.vid}_\n`: ''}`)
        } catch (e) {
            m.reply("_Not Found !_");
        }
    })
