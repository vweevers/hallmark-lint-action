'use strict'

module.exports = function ann (file) {
  if (Array.isArray(file)) {
    return file.reduce(function (acc, file) {
      return acc.concat(ann(file))
    }, [])
  }

  return file.messages.map(function (msg) {
    // Not sure if this is always set
    const location = msg.location || {}
    const start = location.start || {}
    const end = location.end || {}
    const startLine = start.line || msg.line || 1
    const endLine = end.line || startLine

    const annotation = {
      path: file.path,
      title: msg.message || 'n/a',
      message: [msg.source, msg.ruleId].filter(Boolean).join(': '),
      annotation_level: msg.fatal ? 'failure' : 'warning',
      start_line: startLine,
      end_line: endLine > startLine + 10 ? startLine : endLine
    }

    // "Annotations only support start_column and end_column on the same line"
    if (startLine === endLine && start.column && end.column) {
      annotation.start_column = start.column
      annotation.end_column = end.column
    }

    return annotation
  })
}
