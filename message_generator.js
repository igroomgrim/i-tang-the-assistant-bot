'use strict'

module.exports = {
  genTextMessage: function (text) {
    return {
      'text': text
    }
  },

  genQuickReplyMessage: function (text, quickReplies) {
  	return {
  		'text': text,
  		'quick_replies': quickReplies
  	}
  },

  genButtonMessage: function (text, buttons) {
  	return {
  		'attachment': {
  			'type': 'template',
  			'payload': {
  				'template_type': 'button',
  				'text': text,
  				'buttons': buttons
  			}
  		}
  	}
  }
}

