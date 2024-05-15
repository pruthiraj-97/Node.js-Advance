const client=require('./client')
async function init(){
//   await client.set('user:3','javascript')
await client.lpush('message',1100)
}
init()