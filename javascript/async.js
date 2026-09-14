function getData(){
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
            resolve ("data  received");
        },2000);
    });
}

async function start() {
    try {

        const result = await getData();

        console.log(result);
    } catch (error) {
        console.error(error);
    }finally {
        console.log("process finished");
    }


}

start();