var net = require('net')
const {
    REGISTER,
    CHOOSE_FRIEND,
    MSG
} = require('./event-type')
var chatMap = {}

var server = new net.Server((client) => {

    console.log('* client connected!')

    var sendRegisterResult = (res, text) => {
        client.write(JSON.stringify({
            res: res,
            type: REGISTER,
            text: text
        }))
    }

    var sendChooseFriendResult = (res, text = 'choose friend compeled !') => {
        client.write(JSON.stringify({
            res: res,
            type: CHOOSE_FRIEND,
            text: text,
        }))
    }

    var sendMsgResult = (data) => {
        client.write(JSON.stringify(data))
    }

    client.on('error', (err) => {
        console.log('* server occurred a error: ', err)
    })

    client.on('end', () => {
        console.log('* client disconnected!')
    })

    client.on('data', (data) => {
        data = JSON.parse(data.toString())
        server.getConnections((err, count) => {
            console.log('* current count: ', count)
        })

        client.emit('AAA', 'save the world')

        console.log('* current map  : ', chatMap)
        console.log('* receive msg  : ', data)
        if (data.type == REGISTER) {
            if (~Object.keys(chatMap).indexOf(data.text)) {
                sendRegisterResult(-1, 'user already exists')
            } else {
                chatMap[data.text] = null
                sendRegisterResult(1, 'user add success !')
            }
        } else if (data.type == CHOOSE_FRIEND) {
            chatMap[data.from] = data.text
            sendChooseFriendResult(1)
        } else if (data.type == MSG) {
            if (data.text == 3) {
                var t = setTimeout(() => {
                    console.log('* thanks for your wait')
                    sendMsgResult(data)
                    clearTimeout(t)
                }, 3000)
            } else {
                sendMsgResult(data)
            }
        }
    })

    // client.pipe(client)  // pipe就是原路返回
})

const port = 5566
server.listen(port, () => {
    console.log(`* Server bind port ${port} and start listen...`)
})