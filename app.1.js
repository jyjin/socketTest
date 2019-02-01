var net = require('net')
var scanf = require('./scanf')
var socket = new net.Socket()
const {
    REGISTER,
    CHOOSE_FRIEND,
    MSG
} = require('./event-type')
var client = socket.connect('5566', '127.0.0.1', () => {

    console.log('socket connected')

    var owner = ''
    var to = 'tom'
    var sendMsg = () => {
        scanf(owner, (content) => {
            client.write(JSON.stringify({
                type: MSG,
                text: content,
                from: owner,
                to: to,
            }))
        })
    }

    var sendRegisterMsg = (text) => {
        client.write(JSON.stringify({
            type: REGISTER,
            text: text
        }))
    }

    var sendChooseFriendMsg = (text) => {
        client.write(JSON.stringify({
            type: CHOOSE_FRIEND,
            text: text,
            from: owner
        }))
    }

    var register = () => {
        scanf('Please enter a name for yourself: ', (content) => {
            owner = content
            sendRegisterMsg(content)
        })
    }

    var chooseFriend = () => {
        scanf('Please enter a name for your want to chat: ', (content) => {
            sendChooseFriendMsg(content)
        })
    }

    register()

    // sendMsg();

    client.on('data', (data) => {
        data = JSON.parse(data.toString())
        if (data.type == REGISTER) {
            if (data.res > 0) {
                console.log('注册成功')
                chooseFriend()
            } else {
                console.log(data.text)
                register()
            }
            return
        } else if (data.type == CHOOSE_FRIEND) {
            if (data.res > 0) {
                sendMsg()
            }else{
                console.log('选择朋友不成功')
                chooseFriend()
            }
        } else if (data.type == MSG) {
            console.log(`${data.from}> ` + data.text)
            sendMsg()
        }
    })
})

client.on('end', () => {
    console.log('* disconnected from server!')
})

client.on('err', (err) => {
    console.log('* client error: ', err)
})
