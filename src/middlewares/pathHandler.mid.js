const pathHandler = (req , res) =>{
    const message = "Not found path"
    const data = {
        method: req.method,
        url: req.url,
        error: message
    }

    return res.status(404).json({ response: data })
}

export default pathHandler