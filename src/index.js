const myWorker = new Worker('./worker.js')

const fnMap = new Map()

function postMessageFn(fn, callback) {
    // 向worker传递消息
    const data = {
        fn : '(' + fn + ')()',
        id: Date.now()
    }
    fnMap.set(data.id, callback)
    myWorker.postMessage(data);
}

async function postMessage() {
   const res = await call(() => {
    return fabonacci(40)
    // 斐波那契数列
    function fabonacci(n) {
       if (n === 0) {
           return 0;
       }
       if (n === 1) {
           return 1;
       }
       return fabonacci(n - 1) + fabonacci(n - 2);
    }
   });
   alert(res)
}


function call(fn, context) {
    return new Promise((resolve, reject) => {
        try {
            postMessageFn(fn,resolve)
        }catch(err) {
            reject(err)
        }
    })
}


myWorker.onmessage = function(messageEvent) {
    console.log('recieve:', messageEvent)
    const {data} = messageEvent;

    const fn  = fnMap.get(data.id)
    if (fn) {
        fn(data.res);
        fnMap.delete(data.id)
    }
}
