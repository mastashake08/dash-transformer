class DashTransformer extends TransformStream {

    constructor(baseUrl) {
        super()
        this.baseUrl = baseUrl   
        this.generator = this.sendVideoChunk()
        this.num = String(1).padStart(3, '0')
    }

    transform(chunk, controller) {
        const file = new File([chunk],`${this.num}.webm`)
        this.generator.next(file)
        controller.enqueue(chunk)
      }

     *sendVideoChunk(file = null) {
        while(true) {
            try {
                const formData = new FormData()
                formData.append('file', file)
                fetch(this.baseUrl, {
                    method: 'PUT',
                    body: formData
                })
                yield file
                this.num++
            } catch (error) {
                this.generator.throw(error)
            }
        }
    }
}

export {
    DashTransformer
}