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

const Language = require('../language')
const { errorMessage, infoMessage } = require('../helpers')
const Lang = Language.getString('instagram')


if (cn.WORKTYPE == 'private') {

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
          .get(`https://videfikri.com/api/igdl/?url=${link}`) //https://lolhuman.herokuapp.com/api/instagram?apikey=156098b3f614ab22fe6e1678&url=
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
            *${Lang.STATUS}*: ${status}
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.TYPE_POST}*: ${type_post}
            *${Lang.CAPTION}*: ${caption}
            *${Lang.LIKE}*: ${like}
            *${Lang.COMMENT}*: ${comment}
            *${Lang.DURATION}*: ${duration}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.IG_NOT_FOUND + link)),
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
            *${Lang.STATUS}*: ${status}
            *${Lang.NAME}*: ${full_name}
            *${Lang.USERNAME}*: ${username}
            *${Lang.CREATOR}*: ${creator}
            *${Lang.TYPE_POST}*: ${type_post}
            *${Lang.CAPTION}*: ${caption}
            *${Lang.LIKE}*: ${like}
            *${Lang.COMMENT}*: ${comment}
            *${Lang.DURATION}*: ${duration}
            `
            await message.sendMessage(Buffer.from(videoBuffer.data), MessageType.video, {
                caption: msg,
            })
          })
          .catch(
            async (err) => await message.sendMessage(errorMessage(Lang.IG_NOT_FOUND + link)),
          )
      },
    )
}
