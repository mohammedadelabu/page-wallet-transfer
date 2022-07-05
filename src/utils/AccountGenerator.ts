function generatewalletId(start: any) {
    start = parseInt(start)
    while (!(start.length > 10)) {
        start = start + 1
        return start.toString()
    }
}
export default generatewalletId;