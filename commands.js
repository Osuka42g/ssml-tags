module.exports = {
  simple: [
		{
			command: 'extension.ssml-speak',
			tag: '<speak>',
			close: '</speak>',
		},
		{
			command: 'extension.ssml-emphasis',
			tag: '<emphasis>',
			close: '</emphasis>',
		},
		{
			command: 'extension.ssml-paragraph',
			tag: '<p>',
			close: '</p>',
		},
	],
}