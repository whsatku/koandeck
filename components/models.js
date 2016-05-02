import Realms from 'realm';

export default new Realm({
	schema: [
		{
			name: 'Document',
			properties: {
				name: 'string',
				slides: {type: 'list', objectType: 'Slide'},
			}
		},
		{
			name: 'Slide',
			properties: {
				text1: 'string',
				text2: 'string',
				text1Color: 'string',
				text2Color: 'string',
				image: 'string',
				layout: 'int',
			}
		}
	]
});
