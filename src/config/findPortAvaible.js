import net from 'node:net';

export default function findportAvaible(portDesired) {
    return new Promise((resolve, rejected)=>{
        if(!portDesired) {
            resolve(null);
        }

        const server = net.createServer();

        server.on('error', (err)=>{
            if(err.code === 'EACCES'){
                findportAvaible(portDesired + 1).then(port => resolve(port)); 
            }else {
                rejected(err);
            }
        });

        server.listen(portDesired,()=>{
            const { port } = server.address(); 
            server.close(()=>{
                resolve(port);
            });
        });

    });
}