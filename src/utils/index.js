export function getRedirectTo(type, header) {
    let redirectTo
    if (header) {
        redirectTo = '/home'
    } else {
        if (type === 'boss') {
            redirectTo = '/bossinfo'
        } else {
            redirectTo = '/workerinfo'
        }
    }
    return redirectTo
}