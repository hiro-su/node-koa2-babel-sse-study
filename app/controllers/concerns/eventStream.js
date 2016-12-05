export default function eventStream() {
    return async function (ctx, next) {
        ctx.req.setTimeout(0); //no timeout
        ctx.type = 'text/event-stream; charset=utf-8';
        ctx.set('Cache-Control', 'no-cache');
        ctx.set('Connection', 'keep-alive');
        ctx.set('Transfer-Encoding', 'chunked');

        await next();
    }
}