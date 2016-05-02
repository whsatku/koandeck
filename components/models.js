import Realms from 'realm';

export default new Realm({
	schema: [
		{
			name: 'Document',
			primaryKey: 'id',
			properties: {
				id: 'int',
				name: 'string',
				slides: {type: 'list', objectType: 'Slide'},
			}
		},
		{
			name: 'Slide',
			properties: {
				text1: {type: 'string', optional: true},
				text2: {type: 'string', optional: true},
				text1Color: {type: 'string', default: '#000000'},
				text2Color: {type: 'string', default: '#000000'},
				image: {type: 'string', optional: true},
				backgroundColor: {type: 'string', default: '#ffffff'},
				layout: {type: 'int', default: 4},
			}
		}
	]
});
