/*
# Copyright (C) 2020 MuhammedKpln.
# edited by Vai838

# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

*/

const Asena = require('../events')
const { MessageType } = require('@adiwajshing/baileys')
const axios = require('axios')
const cn = require('../config');
const wis = require('whois')

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')


if (cn.WORKTYPE == 'private') {
    
    Asena.addCommand({pattern: 'whoois ?(.*)', fromMe: true, deleteCommand: false, desc: Lang.URL}, (async (message, match) => {
                var url= match[1]
                wis.lookup(url, function(err, data) {
                  await message.client.sendMessage(message.jid, data, MessageType.text);
                                    })

    }));
    
    Asena.addCommand({ pattern: 'randanime', fromMe: true }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        await axios
          .get(`https://videfikri.com/api/anime/neko`)
          .then(async (response) => {
            const {
              status,
              url_gbr,
            } = response.data.result

            const imageBuffer = await axios.get(url_gbr, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            `
            await message.sendMessage(Buffer.from(imageBuffer.data), MessageType.image, {
                caption: msg
            })
          })
      },
    )

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: true, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }


        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
    
    Asena.addCommand({ pattern: 'ig ?(.*)', fromMe: true, usage: Lang.IG_USAGE, desc: Lang.IG_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.IG_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.IG_LOADING))

        await axios
          .get(`https://videfikri.com/api/igdl/?url=${link}`)
          .then(async (response) => {
            const {
              status,  
              creator,
              type_post,
              full_name,
              username,
              caption,
              like,
              comment,
              video,
              duration,
            } = response.data.result
            
            const videoBuffer = await axios.get(video, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.TYPE_HOST}*: ${type_post}
            *${Lang.FULL_NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CAPTON}*: ${caption}
            *${Lang.LIKE}*: ${like}
            *${Lang.COMMENT}*: ${comment}
            *${Lang.DURATION}*: ${duration}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.IG_NOT_FOUND + link)),
          )           
      },
    )
    
    Asena.addCommand({ pattern: 'fb ?(.*)', fromMe: true, usage: Lang.FB_USAGE, desc: Lang.FB_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.FB_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.FB_LOADING))

        await axios
          .get(`https://videfikri.com/api/fbdl/?urlfb=${link}`)
          .then(async (response) => {
            const {
              status,
              creator,
              judul,
              url,
            } = response.data.result

            const videoBuffer = await axios.get(url, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.CAPTION}*: ${judul}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.FB_NOT_FOUND + link)),
          )
      },
    )
    
    Asena.addCommand({ pattern: 'mailspam ?(.*)', fromMe: true, usage: Lang.SPAM_MAIL_USAGE, desc: Lang.SPAM_MAIL_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const mailid = match[1]
        const subj = match[2]
        const messge = match[3]

        await message.sendMessage(infoMessage(Lang.SPAM_MAIL_LOADING))

        await axios
          .get(`https://videfikri.com/api/spamemail/?email=${mailid}&subjek=${subj}&pesan=${messge}`)
          .then(async (response) => {
            const {
              status,
              creator,
              target,
              subjek,
              pesan,
              log_lengkap,
            } = response.data.result

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.TARGET}*: ${target}
            *${Lang.SUBJECT}*: ${subjek}
            *${Lang.MESSAGE}*: ${pesan}
            *${Lang.LOG}*: ${log_lengkap}
            `

            await message.client.sendMessage(message.jid, msg, MessageType.text);
          })
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, usage: Lang.TTK_USAGE, desc: Lang.TTK_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const ttk_link = match[1]

        if (!ttk_link) return await message.sendMessage(errorMessage(Lang.TTK_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.TTK_LOADING))

        await axios
          .get(`https://videfikri.com/api/tiktok/?url=${ttk_link}`)
          .then(async (response) => {
            const {
              status,
              creator,
              username,
              caption,
              link,
              uploaded_on,
            } = response.data.result

            const videoBuffer = await axios.get(link, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CAPTION}*: ${caption}
            *${Lang.UPLOADED_ON}*: ${uploaded_on}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.TTK_NOT_FOUND + link)),
          )
      },
    )

    Asena.addCommand({ pattern: 'twitter ?(.*)', fromMe: true, usage: Lang.TWEET_USAGE, desc: Lang.TWEET_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.TWEET_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.TWEET_LOADING))

                await axios
                  .get(`https://videfikri.com/api/stalktwit/?username=${link}`)
                  .then(async (response) => {
                    const {
                      status,
                      creator,
                      full_name,
                      username,
                      followers,
                      following,
                      tweets,
                      profile,
                      verified,
                      listed_count,
                      favourites,
                      joined_on,
                      profile_banner,
                    } = response.data.result

                    const profileBuffer = await axios.get(profile, {
                          responseType: 'arraybuffer',
                        })

                    const bannerBuffer = await axios.get(profile_banner, {
                          responseType: 'arraybuffer',
                })

                    const msg = `
                    *${Lang.HTTP_STATUS}*: ${status}
                    *${Lang.CREATOR}*: ${creator}
                    *${Lang.USERNAME}*: ${username}
                    *${Lang.FULL_NAME}*: ${full_name}
                    *${Lang.FOLLOWERS}*: ${followers}
                    *${Lang.FOLLOWING}*: ${following}
                    *${Lang.TWEETS}*: ${tweets}
                    *${Lang.VERIFIED}*: ${verified}
                    *${Lang.LISTED_COUNT}*: ${listed_count}
                    *${Lang.FAVOURITES}*: ${favourites}
                    *${Lang.JOINED_ON}*: ${joined_on}
                    `
                    await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
                        caption: msg
                    })
                    await message.sendMessage(Buffer.from(bannerBuffer.data), MessageType.image, {
                    })
                  })
                  .catch(
                    async (err) => await message.sendMessage(errorMessage(Lang.TWEET_NOT_FOUND + link)),
                  )
              },
            )

}
else if (cn.WORKTYPE == 'public') {

    Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }


        const userName = match[1]

        if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD))

        await message.sendMessage(infoMessage(Lang.LOADING))

        await axios
          .get(`https://videfikri.com/api/igstalk/?username=${userName}`)
          .then(async (response) => {
            const {
              profile_hd,
              username,
              bio,
              followers,
              following,
              full_name,
              is_private,
            } = response.data.result

            const profileBuffer = await axios.get(profile_hd, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.BIO}*: ${bio}
            *${Lang.FOLLOWERS}*: ${followers}
            *${Lang.FOLLOWS}*: ${following}
            *${Lang.ACCOUNT}*: ${is_private ? Lang.HIDDEN : Lang.PUBLIC}`

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
              caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUND + userName)),
          )
      },
    )
    
    Asena.addCommand({ pattern: 'ig ?(.*)', fromMe: false, usage: Lang.IG_USAGE, desc: Lang.IG_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.IG_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.IG_LOADING))

        await axios
          .get(`https://videfikri.com/api/igdl/?url=${link}`)
          .then(async (response) => {
            const {
              status,
              creator,
              type_post,
              full_name,
              username,
              caption,
              like,
              comment,
              video,
              duration,
            } = response.data.result
            
            const videoBuffer = await axios.get(video, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.TYPE_HOST}*: ${type_post}
            *${Lang.FULL_NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CAPTON}*: ${caption}
            *${Lang.LIKE}*: ${like}
            *${Lang.COMMENT}*: ${comment}
            *${Lang.DURATION}*: ${duration}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.IG_NOT_FOUND + link)),
          )           
      },
    )
    
    Asena.addCommand({ pattern: 'fb ?(.*)', fromMe: true, usage: Lang.FB_USAGE, desc: Lang.FB_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.FB_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.FB_LOADING))

        await axios
          .get(`https://videfikri.com/api/fbdl/?urlfb=${link}`)
          .then(async (response) => {
            const {
              status,
              creator,
              judul,
              url,
            } = response.data.result

            const videoBuffer = await axios.get(url, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.CAPTION}*: ${judul}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.FB_NOT_FOUND + link)),
          )
      },
    )

    Asena.addCommand({ pattern: 'tiktok ?(.*)', fromMe: true, usage: Lang.TTK_USAGE, desc: Lang.TTK_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const ttk_link = match[1]

        if (!ttk_link) return await message.sendMessage(errorMessage(Lang.TTK_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.TTK_LOADING))

        await axios
          .get(`https://videfikri.com/api/tiktok/?url=${ttk_link}`)
          .then(async (response) => {
            const {
              status,
              creator,
              username,
              caption,
              link,
              uploaded_on,
            } = response.data.result

            const videoBuffer = await axios.get(link, {
              responseType: 'arraybuffer',
            })

            const msg = `
            *${Lang.HTTP_STATUS}*: ${status}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CAPTION}*: ${caption}
            *${Lang.UPLOADED_ON}*: ${uploaded_on}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.TTK_NOT_FOUND + link)),
          )
      },
    )

    Asena.addCommand({ pattern: 'twitter ?(.*)', fromMe: true, usage: Lang.TWEET_USAGE, desc: Lang.TWEET_DESC }, async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        const link = match[1]

        if (!link) return await message.sendMessage(errorMessage(Lang.TWEET_NEED_WORD))

        await message.sendMessage(infoMessage(Lang.TWEET_LOADING))

                await axios
                  .get(`https://videfikri.com/api/stalktwit/?username=${link}`)
                  .then(async (response) => {
                    const {
                      status,
                      creator,
                      full_name,
                      username,
                      followers,
                      following,
                      tweets,
                      profile,
                      verified,
                      listed_count,
                      favourites,
                      joined_on,
                      profile_banner,
                    } = response.data.result

                    const profileBuffer = await axios.get(profile, {
                          responseType: 'arraybuffer',
                        })

                    const bannerBuffer = await axios.get(profile_banner, {
                          responseType: 'arraybuffer',
                })

                    const msg = `
                    *${Lang.HTTP_STATUS}*: ${status}
                    *${Lang.CREATOR}*: ${creator}
                    *${Lang.USERNAME}*: ${username}
                    *${Lang.FULL_NAME}*: ${full_name}
                    *${Lang.FOLLOWERS}*: ${followers}
                    *${Lang.FOLLOWING}*: ${following}
                    *${Lang.TWEETS}*: ${tweets}
                    *${Lang.VERIFIED}*: ${verified}
                    *${Lang.LISTED_COUNT}*: ${listed_count}
                    *${Lang.FAVOURITES}*: ${favourites}
                    *${Lang.JOINED_ON}*: ${joined_on}
                    `
                    await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
                        caption: msg
                    })
                    await message.sendMessage(Buffer.from(bannerBuffer.data), MessageType.image, {
                    })
                  })
                  .catch(
                    async (err) => await message.sendMessage(errorMessage(Lang.TWEET_NOT_FOUND + link)),
                  )
              },
            )

}
