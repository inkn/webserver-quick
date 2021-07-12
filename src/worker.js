onmessage = function(messageEvent) {
    const { data } = messageEvent
    const {id , fn}= data
    const res =  eval(fn)
    postMessage({id, res})
}