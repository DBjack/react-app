export function getRedirectTo(type, header) {
    let redirectTo
    if (header) {
        type === 'boss' ? redirectTo = '/dashen' : redirectTo = '/laoban'
    } else {
        type === 'boss' ? redirectTo = '/bossinfo' : redirectTo = '/workerinfo'
    }
    return redirectTo
}