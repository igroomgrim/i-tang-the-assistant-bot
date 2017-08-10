'use strict'

module.exports = {
  quickReplyButton: function (type, title, payload) {
	// For this version type is fix to text only
    return {
      'content_type': 'text',
      'title': title,
      'payload': payload
    }
  },

  postbackButton: function (title, payload) {
    return {
      'type': 'postback',
      'title': title,
      'payload': payload
    }
  },

  urlButton: function (title, url) {
    return {
      'type': 'web_url',
      'title': title,
      'url': url,
      'webview_height_ratio': 'compact'
    }
  },

  callButton: function (title, telNumber) {
    return {
      'type': 'phone_number',
      'title': title,
      'payload': telNumber
    }
  }
}
