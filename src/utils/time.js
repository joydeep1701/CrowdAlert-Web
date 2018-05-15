function calcAge(timestamp) {
    const duration = Math.floor((new Date() - timestamp)/1000)
    if (duration < 60) {
        return "Just now";
    }
    if (duration < 120 ) {
        return "About a minute ago";
    }
    if (duration < 3600 ) {
        return `About ${Math.floor(duration/60) } minutes ago`
    }
    if (duration < 3600*24 ) {
        return `About ${Math.floor(duration/3600) } hours ago`
    }
    if (duration < 3600*24*100 ) {
        return `About ${Math.floor(duration/(3600*24)) } days ago`
    }
    if (duration < 3600*24*365 ) {       
        return `About ${Math.floor(duration/(3600*24*30)) } months ago`
    }
    

}

export { calcAge };