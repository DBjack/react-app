export function getRedirectTo(type, header) {
    let redirectTo
    if (header) {
        if (type === 'boss') {
            redirectTo = '/laoban'
        } else {
            redirectTo = '/dashen'
        }
    } else {
        if (type === 'boss') {
            redirectTo = '/bossinfo'
        } else {
            redirectTo = '/workerinfo'
        }
    }
    return redirectTo
}