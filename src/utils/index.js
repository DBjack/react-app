export function getRedirectTo(type, header) {
    let redirectTo
    if (header) {
        if (type === 'boss') {
            redirectTo = '/dashen'
        } else {
            redirectTo = '/laoban'
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