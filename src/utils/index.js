export function getRedirectTo(type, header) {
    let redirectTo
    if (type === 'boss') {
        redirectTo = '/bossinfo'
    } else {
        redirectTo = '/workerinfo'
    }
    return redirectTo
}