// const Error = require('Error')
const EventEmitter = require('events')
const fs = require('fs')

class FileUploader extends EventEmitter {
  upload(file) {
    this.emit('start', file)
    const randomNumber = 1
    if (randomNumber > 0.8) {
      const error = new FileUploadError('an error ocured ')
      error.code = 'FILE_MUST_START'
      this.emit('error', error)
      return
    }

    setTimeout(() => {
      this.emit('upload', file)
      this.processFile(file)
    }, 1000)
  }

  processFile(file) {
    this.emit('startProcessing', file)
    setTimeout(() => {
      this.emit('processingCompleted', file)
    }, 2000)
  }
}

class FileUploadError extends Error {
  constructor(message) {
    super(message)
    this.name = 'FileUploaderError'
    this.status = 500
  }
}

const fileUploader = new FileUploader()

fileUploader.on('start', (file) => {
  console.log(`Upload started for file:${file}`)
})

fileUploader.on('error', (error) => {
  // console.log(`Error occured${error}`)
  throw error
})

fileUploader.on('upload', (file) => {
  console.log(`Upload completed for file: ${file}`)
})

fileUploader.on('startProcessing', (file) => {
  console.log(`File processing started for file: ${file}`)
})

fileUploader.on('processingCompleted', (file) => {
  console.log(`File processing completed for file:${file}`)
})

// const uploadedFile = 'problem.txt'
// fileUploader.upload(uploadedFile)

const uploadedFileTwo = 'probleme.txt'
fileUploader.upload(uploadedFileTwo)
